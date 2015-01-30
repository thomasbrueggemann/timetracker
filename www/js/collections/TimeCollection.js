
define([
    "jquery",
    "underscore-min",
    "backbone-min",
    "backbone-localStorage",
    "models/TimeModel"
], function ($, _, backbone, ls, TimeModel) {

	var TimeCollection = Backbone.Collection.extend({

	    model: TimeModel,
	    localStorage: new Backbone.LocalStorage("TimeCollection"),

	    // INITIALIZE
	    initialize: function () {
	        this.bind("remove", this.onModelRemoved, this);
	    },

	    // ON MODEL REMOVED
	    onModelRemoved: function(model, collection, options) {
	    	model.destroy();
	    }
	});

	return TimeCollection;
});