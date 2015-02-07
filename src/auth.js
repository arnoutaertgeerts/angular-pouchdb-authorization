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