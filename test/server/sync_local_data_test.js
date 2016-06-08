var paths = require('./../../src/utils/_globals').paths
var consts = require('./../../src/utils/_globals').consts

var should = require('chai').should();

var sync_local_data = require('./../../src/server/sync_local_data')
var data_utils = require('./../../src/server/data_utils')
var fs = require('fs')
var path = require('path')
var moment = require('moment')

describe('createInitialEventData', function() {

	var fakeResponsePath = path.join( paths.testPath, '/fake_data/fake_response.json' )

	// get the cached reponse from google
	var fakeResponse = JSON.parse( fs.readFileSync(fakeResponsePath, "utf8") )

	// ensure that my fake data is valid
	fakeResponse.should.be.an('Array')

	// make the first two items appear to be on the current
	// date to put them in the sprint
	
	var curDate = moment().format('YYYY-MM-DD')
	should.exist(fakeResponse[0].start)
	should.exist(fakeResponse[1].start)

	fakeResponse[0].start.date = curDate
	fakeResponse[1].start.date = curDate

	// get the function to process the faked response
	var createdData = sync_local_data.createInitialEventData(fakeResponse)

	// write the fake initial data to a file for testing purposes
	// data_utils.writeData(createdData, path.join( __dirname, '/fake_data/initData.json' ), function(){
	// 	console.log('yay more fake data')
	// })
	
	it('Should take a list of events corresponding to the week and initialize our local data structure', function(){


		// the two required objects in the created data
		should.exist(createdData.sprint)
		should.exist(createdData.backlog)

	});

	it('Only events that belong to the current day should be in the sprint', function(){


		// count the length of the sprint object
		var sprintLen = 0

		// neccesary to iterate using keys because the sprint object is an object
		// with properties corresponding to the ID of a calendar event 
		// this is how the event data is stored
		// sprintKeys is a list of ID's which correspond to
		// properties of the sprint object
		var sprintKeys = Object.keys(createdData.sprint)

		// iterate over all the events indexed by the id as the key
		for(var i =0; i < sprintKeys.length; i++){
			var curEvent = createdData.sprint[sprintKeys[i]] 

			// required prop
			should.exist(curEvent.summary)
			// it's in the sprint, the date should be the current dat
			curEvent.start.date.should.equal(curDate)

			sprintLen++
		}

		// length of sprint in fake data generated
		sprintLen.should.equal(2)

	});

	it('Only events that do not belong to the current day should be in the backlog', function(){


		var backlogLen = 0

		// see sprintKeys for explanation of key iteration
		var backlogKeys = Object.keys(createdData.backlog)


		for(var i =0; i < backlogKeys.length; i++){
			var curEvent = createdData.backlog[backlogKeys[i]] 

			// required property
			should.exist(curEvent.summary)
			// backlog events do not belong to the current day
			curEvent.start.date.should.not.equal(curDate)
			backlogLen++
		}

		// length of backlog in faked data
		backlogLen.should.equal(4)

	});

	it('Events with description properties should be preserved', function(){

		// I gave one item in the sprint and the backlog an optional description
		// check that this is preserved
		// also check that this two items have the correct value for their summaries

		// ID of first item in the fake data
		var sprintEvent = createdData.sprint['02ous69h6u6h7halum2va6r3dg']

		// Should have a description
		should.exist(sprintEvent.description)
		sprintEvent.description.should.equal("sprint item")

		// Should have a summary
		should.exist(sprintEvent.summary)
		sprintEvent.summary.should.equal("Try exporting log data, into usable format")


		// ID of first item in the fake data
		var backlogEvent = createdData.backlog['eftipnbkcm845foa8t05b80mvs']

		// Should have a description
		should.exist(backlogEvent.description)
		backlogEvent.description.should.equal("backlog item")

		// Should have a summary
		should.exist(backlogEvent.summary)
		backlogEvent.summary.should.equal("Deal with koodo with mom")

	});

});

describe('updateLocalEvents', function(){

	// the properties maintained locally by the app that should be removed
	var whiteList = consts.eventPropWhiteList
	var blackList = consts.eventPropBlackList

	// the event stored in local data
	var localEvent =  { 
		"02ous69h6u6h7halum2va6r3dg": {
		"summary": "old summary",
		"description": "old description",
		"oldField": "old calendar field",
		"rank": "10",
		"start": {
		"date": "2016-04-09"
		}
		}
	}

	var eventId = Object.keys(localEvent)[0]

	// the event recieved as a response from google calendar
	//  corresponding to the local data event
	var calEvent =   {
		"id": eventId,
		"summary": "new summary",
		"description" : "new description",
		"newField": "new content",
		"start": {
		"date": "2016-04-10"
		}
	}
	localEvent = sync_local_data.updateLocalEvents(localEvent,calEvent)

	it('should ensure all the fields of the calEvent match the fields of the local event. \
		 This includes the fields that should have been added', function(){


	  Object.keys(calEvent).forEach( function(key,index){
	  	if( key !== "id" ){
		  	should.exist(localEvent[eventId][key])
		  	localEvent[eventId][key].should.equal(calEvent[key]);
		  }
	  });

	});

	it('should ensure all the old fields in the localEvent not present \
		in the calendar event should be removed, excepting the whiteList', function(){
			
		
		// whiteList properties should still exist
		whiteList.forEach( function( prop, index ){
			should.exist(localEvent[eventId][prop])
		});

		should.not.exist(localEvent[eventId]['oldField'])

	});
	
	it('should add all the new field in the calEvent, excepting the blacklist', function(){
		
		// blackList properties should not exist
		blackList.forEach( function( prop, index ){
			should.not.exist(localEvent[eventId][prop])
		});
		
	})

});

describe('deleteEventById', function(){
	var list = { 
    "02ous69h6u6h7halum2va6r3dg": {
      "summary": "Try exporting log data, into usable format",
      "description": "sprint item",
      "start": {
        "date": "2016-04-17"
      }
    },
    "0aj8qpmvj1n27d3vubgu1c2ro8": {
      "summary": "Music onto phone",
      "start": {
        "date": "2016-04-17"
      }
    }
	}

	var eventId = Object.keys(list)[0]

	sync_local_data.deleteEventById(eventId,list)

	it('Should take a local eventId and a reference to a list containing that event \
			 and remove the event from the list', function(){

		// should should not be indexable in list
		should.not.exist(list[eventId])
		});

	it('The list should reflect a new appropiate length', function(){
		// lists length should reflect the deleted event
		Object.keys(list).should.have.length(1)
	});
})