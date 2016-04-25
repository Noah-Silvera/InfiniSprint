var appRoot = require('app-root-path')
var paths = require( appRoot + '\\_globals').paths


var should = require('chai').should();
var google_api = require( paths.scriptsPath + '/server' + '/google_api')
var moment = require('moment')

describe('getEventsForTimeSpan', function() {

  it('Should list events corresponding to the upcoming week', function () {
  	// get start and end dates for the week starting on this day
  	var startOfWeek = moment().startOf('day')
  	var endOfWeek = startOfWeek.add(7,'days')
  	
  	// fetch the events for that time span
  	google_api.getEventsForTimeSpan( startOfWeek, endOfWeek, function(events){

  		// function didn't bomb
  		should.exist(events)

  		// returned right data type
  		events.should.be.an('array')

  		// more than one event in the upcoming week ( in my calendar, this will ALWAYS be the case )
  		events.should.not.have.length(0)

  		// check for the required propertys in the event for the app to function
  		var neccesaryProps = ['summary','id']

  		// for each event in the response
  		events.forEach( function(event,i){

  			// check that it has the neccesary properties
	  		neccesaryProps.forEach( function(prop){
	  			events[i].should.have.property(prop)
	  		});
  		});
  	});
  });

  it('Should list events corresponding to a specific day', function() {
  	var startOfDay= moment().startOf('day')
  	var endOfDay = moment().endOf('day')

	// fetch the events for that time span
  	google_api.getEventsForTimeSpan( startOfDay, endOfDay, function(events){

  		// function didn't bomb
  		should.exist(events)

  		// for each event in the response
  		events.forEach( function(event,i){

  			// check that it has the correct date
  			var eventDate = moment(event.start.date)
  			eventDate.diff(moment(), 'day').should.equal(0)
  		});
  	});  	
  });

});