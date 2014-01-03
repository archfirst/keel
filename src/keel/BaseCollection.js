/**
 * @description:
 * to quickly and easily create a collection when all your APIs return based on a REST api such as http:weaher.eu/today/zip
 *
 * @usage:
 * var myCollection = new BaseCollection('02129');
 *
 */

define([
	"backbone",
	"app/framework/AppConfig"
], function(
	Backbone,
	AppConfig
){
	"use strict";
	

	return Backbone.Collection.extend({

		endpoint : "",

		// initialize the collection and take the passed endpoint to create the API calls
		initialize: function(endPoint){
			this.endPoint = endPoint;
		},

		//
		url: function(){
			return AppConfig.apiRoot + this.endPoint;
		}

	});

});
