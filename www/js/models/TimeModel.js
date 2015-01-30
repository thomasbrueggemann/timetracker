define([
    "jquery",
    "underscore-min",
    "backbone-min",
    "moment"
], function ($, _, backbone, moment) {

	var TimeModel = Backbone.Model.extend({
		defaults: {
			id: moment.utc().unix(),
			start: null,
			stop: null,
			hours: null
		}
	});

	return TimeModel;
});