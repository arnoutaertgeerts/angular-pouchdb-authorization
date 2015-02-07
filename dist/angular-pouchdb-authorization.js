(function() {
    'use strict';

    angular
        .module('authorization',  [
            'pouchdb'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('authorization')
        .factory('Access', Access);

    Access.$inject = [];

    function Access() {
        var factory = {};

        //Only accessible to non-logged in users
        factory.anon = [
            'anon'
        ];

        //Accessible to everyone
        factory.public = [
            'anon',
            'user',
            'admin',
            '_admin'
        ];

        //Only accessible to users and admins
        factory.user = [
            'user',
            'admin',
            '_admin'
        ];

        //Only accessible to admins
        factory.admin = [
            'admin',
            '_admin'
        ];

        return factory;
    }
})();   
(function() {
    'use strict';

    angular
        .module('authorization')
        .directive('accessLevel', accessLevelDirective);

    accessLevelDirective.$inject = ['Auth'];

    function accessLevelDirective(Auth) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                var prevDisp = element.css('display'),
                    userRole,
                    accessLevel;

                $scope.user = Auth.user;
                $scope.$watch('user', function (user) {
                    if (user.roles) {
                        userRole = user.roles;
                    }
                    updateCSS();
                }, true);

                attrs.$observe('accessLevel', function (al) {
                    if (al) {
                        accessLevel = al;
                    }
                    updateCSS();
                });

                function updateCSS() {
                    if (userRole && accessLevel) {
                        if (!Auth.authorize(accessLevel, userRole)) {
                            element.css('display', 'none');
                        }
                        else {
                            element.css('display', prevDisp);
                        }
                    }
                }
            }
        };
    }

})();
(function () {
    'use strict';

    angular
        .module('authorization')
        .factory('Auth', Auth);

    Auth.$inject = [
        'PouchDB',
        'Access'
    ];

    function Auth(PouchDB, Access) {
        var db = PouchDB();
        
        var currentUser = { name: '', roles: ['anon']};

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        return {
            authorize: authorize,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,            
            user: currentUser
        };

        //Authorize a route
        function authorize(accessLevel, roles) {
            if (roles === undefined) {
                roles = currentUser.roles;
            }

            var authorizedRoles = Access[accessLevel];
            return _.intersection(authorizedRoles, currentUser.roles).length > 0;

        }

        //Check if a user is logged in
        function isLoggedIn(user) {
            if (user === undefined) {
                user = currentUser;
            }

            return user.roles.indexOf('anon') === -1;
        }

        //Log a user in
        function login(username, password) {
            return db.login(username, password).then(function(response) {                
                currentUser.name = username;
                angular.extend(currentUser, response);            
            });
        }

        //Log a user out
        function logout() {
            return db.logout().then(function () {
                changeUser({
                    name: '',
                    email: '',
                    roles: [
                        'anon'
                    ]
                });
            });
        }        
    }

})();