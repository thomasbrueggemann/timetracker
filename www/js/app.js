define([
    "router",
    "moment",
    "ratchet"
], function (Router, moment, ratchet) {

	var initialize = function() {

		// phonegap is ready
		document.addEventListener("deviceready", function() {

            // apply matching themes
            if(device.platform == "Android" || device.platform == "iOS") {
                $('link[href="css/ratchet-theme-ios.min.css"]').attr("href", "css/ratchet-theme-" + device.platform.toLowerCase() + ".css");
            }

            Router.initialize();

        }, false);
	};

	return {
		"initialize": initialize
	};
});