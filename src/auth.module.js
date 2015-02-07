(function() {
    'use strict';

    angular
        .module('authorization',  [
            'pouchdb'
        ])
        .config(function(pouchDBProvider, POUCHDB_METHODS) {
            // Add pouchdb authentication methods to angular-pouchdb
            var authMethods = {
                login: 'qify',
                logout: 'qify',
                getUser: 'qify',
                getSession: 'qify'
            };

            pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, authMethods);
        })
    ;
})();