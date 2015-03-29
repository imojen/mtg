angular.module('mtgApp').service("notification", function() {
	this.alertMsg = "";
	this.alertShow = false;

	this.showAlert = function( msg ) {
		this.alertMsg = msg;
		this.alertShow = true;
		return this;
	}

	this.hideAlert = function() {
		this.alertMsg = "";
		this.alertShow = false;
		return this;
	}
})