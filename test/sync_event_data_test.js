var should = require('chai').should();
var sync_event_data = require('./../scripts/sync_event_data')
var fs = require('fs')
var path = require('path')
var moment = require('moment')

describe('createInitialEventData', function() {

	it('should take a list of events corresponding to the week and initialize our local data structure', function(){

		var fakeResponsePath = path.join( __dirname, 'fake_data/fake_response.json' )

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
		var createdData = sync_event_data.createInitialEventData(fakeResponse)

		// the two required objects in the created data
		should.exist(createdData.sprint)
		should.exist(createdData.backlog)

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