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