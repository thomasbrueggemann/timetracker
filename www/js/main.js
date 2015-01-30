var lang = localStorage.getItem("lang") || "de";

String.prototype.ucwords = function() {
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s){
        return s.toUpperCase();
    });
};

window.appconfig = {
    "commercialFreq": 6,
    "showImages": true,
    "historySize": 50,
    "maxTopics": 5
};

// Specify global module dependencies
require.config({
    baseUrl: "js/libs",
    i18n: {
        locale: lang
    },
    paths: {
        "app"           : "../app",
        "router"        : "../router",
        "views"         : "../views",
        "collections"   : "../collections",
        "models"        : "../models",
        "notify"        : "../notify",
        "text"          : "../text",
        "templates"     : "../../templates",
        "i18n"          : "../i18n",
        "locales"       : "../locales"
    },
    shim: {
        "modernizr.custom.15848": {
            exports: "Modernizr"
        },
        "jquery": {
            exports: "$"
        },
        "deferred": {
            deps: ["jquery"]
        },
        "callbacks": {
            deps: ["jquery"]
        },
        "underscore-min": {
            exports: "_"
        },
        "backbone-min": {
            deps: ["jquery"],
            exports: "Backbone",
            init: function(_, $) { Backbone.$ = $; return Backbone;}
        },
        "junior": {
            deps: ["jquery", "backbone-min", "underscore-min", "modernizr.custom.15848"],
            exports: "Jr"
        },
        "jquery.transit.min": {
            deps: ["jquery"]
        },
        "loggly.tracker": {
            deps: ["jquery"]
        },
        "ratchet": {
            deps: ["jquery"]
        }
    }
});

require([
    "app"
], function (App) {

    App.initialize();
});