define([
    "jquery",
    "underscore-min",
    "backbone-min",
    "junior",
    "text!templates/main.html",
    "collections/TimeCollection"
], function ($, _, backbone, Jr, mainTpl, TimeCollection) {

	var MainView = Jr.View.extend({

        events: {
            "touchend #rec": "rec",
            "touchend #clear": "clear"
        },

        current: null,
        live: null,

        // INITIALIZE
        initialize: function() {

            var that = this;
            this.collection = new TimeCollection();
            this.collection.fetch();

            if(this.current == null) {
                var active = this.collection.where({"active": true});
                this.current = (active.length > 0) ? active[0] : null;

                if(this.current) {

                    if(this.live == null) {
                        this.live = window.setInterval(function() {

                            $("#info").show();
                            var ago = moment(that.current.get("created")).fromNow();
                            $("#duration").html(ago);
                            
                        }, 10000);
                    }
                }
            }
        },

        // RENDER
        render: function() {

            this.load();
            return this;
        },

        // LOAD
        load: function() {
            
            // render basis html
            var t = _.template(mainTpl)({
                "models": this.collection.where({"active": false}),
                "current": this.current
            });

            this.$el.html(t);
        },

        // UNLOAD
        unload: function() {

            this.undelegateEvents();
        },

        // ROUND TO
        roundTo: function(m, to) {

            var minute = m.minute();
            if (minute <= 15) {
                return m.subtract(minute, "minutes");
            }
            else if (minute > 15 && minute <= 30) {
                return m.add(30 - minute, "minutes");
            }
            else if (minute > 30 && minute <= 45) {
                return m.subtract(minute - 30, "minutes");
            }
            else {
                return m.add(60 - minute, "minutes");
            }
        },

        // REC
        rec: function(e) {
            var that = this;
            e.preventDefault();
            var $e = $(e.target);

            if ($e.hasClass("btn-positive")) {

                $e.removeClass("btn-positive");
                $e.addClass("btn-negative");
                $e.html("Stop");

                $("#info").show();

                this.live = window.setInterval(function() {

                    if(that.current) {
                        var ago = moment(that.current.get("created")).fromNow();
                        $("#duration").html(ago);
                    }
                    
                }, 10000);

                var id = parseInt(moment().unix());
                this.current = this.collection.create({
                    "id": id,
                    "start": this.roundTo(moment()).toDate(),
                    "created": moment().toDate(),
                    "stop": null,
                    "hours": null,
                    "active": true,
                });
            }
            else {

                $e.removeClass("btn-negative");
                $e.addClass("btn-positive");
                $e.html("Start");
                $("#info").hide();

                window.clearInterval(this.live);

                var stop = this.roundTo(moment());

                this.current.save({
                    "stop": stop.toDate(),
                    "active": false
                });

                this.current = null;

                this.load();
            }
        },

        // CLEAR
        clear: function(e) {
            e.preventDefault();
            if(confirm("This will clear all entries. Do you want to proceed?")) {
                this.collection.remove(this.collection.where({"active": false}));
                this.load();
            }
        }
    });

    return MainView;
});