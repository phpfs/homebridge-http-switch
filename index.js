var Service, Characteristic;
var request = require('sync-request');

var url 

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-http-switch", "HTTPSwitch", HTTPSwitch);
}


function HTTPSwitch(log, config) {
    this.log = log;

    this.toggle = config["toggle_url"];
    this.status = config["status_url"]
    this.name = config["name"];
}

HTTPSwitch.prototype = {

    getPowerState: function (callback) {
        var body;
		var res = request("GET", this.status, {});
		if(res.statusCode == 200 && res.body != undefined){
			if(res.body == "1"){
				this.log("HTTP status 1 received!")
				callback(null, true);
			}else{
				this.log("HTTP status 0 received!")
				callback(null, false);
			}
		}else{
			this.log('HTTP status failed for ' + toggle);
			callback(error);
		}
    },

    setPowerState: function(powerOn, callback) {
        var body;
		var res = request("GET", this.toggle, {});
		if(res.statusCode == 200 && res.body != undefined){
			if(res.body == "1"){
				this.log("HTTP status 1 received!")
			}else{
				this.log("HTTP status 0 received!")
			}
			if( (res.body == "1") == powerOn ){
				this.log("HTTP toggle successfull!")
				callback(null, powerOn)
			}else{
				this.log("HTTP toggle failed! " + res.body)
				callback(null, !powerOn)
			}
		}else{
			this.log('HTTP toggle failed for ' + toggle);
			callback(error);
		}

    },

    identify: function (callback) {
        this.log("Identify request received!");
        callback();
    },

    getServices: function () {
        var informationService = new Service.AccessoryInformation();

        informationService
                .setCharacteristic(Characteristic.Manufacturer, "HTTP Manufacturer")
                .setCharacteristic(Characteristic.Model, "HTTP Model")
                .setCharacteristic(Characteristic.SerialNumber, "HTTP Serial Number");

        switchService = new Service.Switch(this.name);
        switchService
                .getCharacteristic(Characteristic.On)
                .on('get', this.getPowerState.bind(this))
                .on('set', this.setPowerState.bind(this));

    
        return [switchService];
    }
};
