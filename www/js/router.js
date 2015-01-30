define([
    "jquery",
    "underscore-min",
    "backbone-min",
    "junior",
    "views/MainView"
], function ($, _, backbone, Jr, MainView) 
{
    var AppRouter = Jr.Router.extend({
        routes: {
            "": "main",
        },

        currentView: null,

        // RENDERING
        rendering: function(view) {
            if(this.currentView) {
                this.currentView.unload();
            }

            this.currentView = view;
            this.renderView(this.currentView);
        },

        // MAIN
        main: function() {
            this.rendering(new MainView());
        }
    });

    // starting the app
    var initialize = function () {
        window.router = new AppRouter;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});