var paths = require('./../../src/utils/_globals').paths


var should = require('chai').should();
var google_api = require('./../../src/server/google_api')
var moment = require('moment')

var startDate = '2016-04-09'
var endDate = '2016-04-10'

var createEventReq = {
		summary : 'Programmatic event',
		description : 'I created this',
		invalidProp : 'this should not cause an error',
		start : {
			date : startDate
		},
		end: {
			date: endDate
		}
}


function clearEvents(startDate,endDate, callback){

	//get the data for all events from that time span
	google_api.getEventsForTimeSpan( moment(startDate), moment(endDate), function(err,events){
		if(err){
			throw err
		}

		// delete all the events for the timeSpan
		for(event in events){
			google_api.deleteEvent(event.id, function(err){
				if(err){
					callback(err)
				}
				w.log('debug',event.summary + " deleted")
			})
		}
	})

	//ensure events are deleted
	google_api.getEventsForTimeSpan( moment(startDate), moment(endDate), function(err,events){
		if(err){
			callback(err)
		}

		events.length.should.equal(0)
	})
	
	return callback(null)
}

// createCalEvent test is dependent on deleteCalEvent
// if one fails, both will
describe('createCalEvent', function(done){
	
	beforeEach( function(done){
		clearEvents(startDate,endDate,function(err){
			if(err){
				throw err
			}
			
			done()
		})
	})
	
	// long timeout since lots of requests

	it('Should take in a obj with fields applicable to \
		google calendar and use the calendar API to make a new event', function(done){
			
		this.timeout(20000)


		w.debug('calendar request')
		w.debug(JSON.stringify(createEventReq,null,2))


		// attempt to create the event
		google_api.createEvent(createEventReq, function(err,event){

			// assure no errors happened
			should.not.exist(err)
			should.exist(event)
			w.debug("event given to calendar request")
			w.debug(JSON.stringify(event,null,2))

			var createdEventId = event.id

			// look for the created event
			google_api.getEventsForTimeSpan(moment('2016-04-09'), moment('2016-04-10'), function(err,events){
				if(err){
					throw err
				}
				w.debug(JSON.stringify(events,null,2))

				var eventFound = false
				for( var event in events){
					if( event.id === createdEventId.id ){
						eventFound = true

						// check that the invalid field wasn't transferred somehow
						should.not.exist['invalidProp']

						for( var prop in createEventReq ){
							if( event[prop] ){
								// ensure all the prop values were transferred correctly
								event[prop].should.equal(createEventReq[prop])
							}
						}
					}
				}

				// ensure that the event was found
				eventFound.should.not.equal(false)


				done()
			})
		})

	})

})

// deleteCalEvent test is dependent on createCalEvent
// if one fails, both will
describe('deleteCalEvent', function(done){
	
	
	
	it('Should delete an event from the remote calendar using a given id', function(done){
		this.timeout(20000)
		
		//create the event we are going to delete
		google_api.createEvent( createEventReq, function(err,event){

			// ensure everything went as it should
			should.not.exist(err)
			should.exist(event)
			should.exist(event.id)

			var deletedEventId = event.id

			// delete the event we just created
			google_api.deleteEvent(event.id, function(err){

				// nothing went wrong
				should.not.exist(err)

				google_api.getEventsForTimeSpan(moment(event.start.date), moment(event.end.date), function(err,events){

					if(err){
						throw err
					}

					// ensure the event has been deleted
					for( var event in events){
						event.id.should.not.equal( deletedEventId )
					}
					
					done()
				})

			})

		})
	})

})

describe('getEventsForTimeSpan', function(done) {

	beforeEach( function(done){
		clearEvents(startDate,endDate,function(err){
			if(err){
				throw err
			}
			
			done()
		})
	})

	it('Should list events corresponding to the upcoming week', function (done) {
		this.timeout(20000)

	  // get start and end dates for the week starting on this day
	  var startOfWeek = moment().startOf('day')
	  var endOfWeek = startOfWeek.add(7,'days')

	  // fetch the events for that time span
	  google_api.getEventsForTimeSpan( startOfWeek, endOfWeek, function(err,events){
		  if(err) throw err

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

			if( event.start !== undefined){
				moment( event.start.date ).diff( moment( endOfWeek) ).should.be.above(0)
			}
			
			
		  });
		  
		  done()
	  });
  });

  it('Should list events corresponding to a specific day', function(done) {
	  this.timeout(20000)
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
		  
		  done()
	  });
  });

});

describe('updateCalEvent', function(done){
	
	beforeEach( function(done){
		clearEvents(startDate,endDate,function(err){
			if(err){
				throw err
			}
			

			done()
		})
	})
	
	it('should update the valid fields of an event', function(done){
		
		this.timeout(20000)
		
		//create an event to update
		google_api.createEvent(createEventReq, function(err,event){
			if(err) throw err
			
			
			var summary = event.summary = "new summary"
			var description = event.description = "new description"
			var invalidProp = event.invalidProp = "new invalidProp"
			var startDate = event.start.date = "2015-04-05"
			var endDate = event.end.date = "2015-04-06"

			
			google_api.updateEvent(event, function(err,event){
				if(err) throw err
				
				should.exist(event)
				
				// check that all the required properties exist
				
				should.exist(event.summary)
				should.exist(event.description)
				should.exist(event.start.date)
				should.exist(event.end.date)
				
				// check that the properties that shouldn't exist, don't
				should.not.exist(event.invalidProp)
				
				event.summary.should.equal( summary )
				event.description.should.equal( description )
				event.start.date.should.equal( startDate )
				event.end.date.should.equal( endDate )
				
				// check that the event appears when you list events for that time span
				
				var returnedEventId = event.id
				
				google_api.getEventsForTimeSpan( moment(startDate), moment(endDate), function(err,events){
					if(err) throw err
					
					var eventFound = false
					
					// attempt to find the event in the list of events returned
					for( event in events){
						if( event.id = returnedEventId ){
							
							eventFound = true
							
							// check that all the properties are correct
							event.summary.should.equal( summary )
							event.description.should.equal( description )
							event.start.date.should.equal( startDate )
							event.end.date.should.equal( endDate )
						}
					}
					
					eventFound.should.equal(true)
					
				})
				
				
				
			})
		})
			
	})

	it('should remove a field of a event if it no longer exists', function(done){
		
		this.timeout(20000)
		
		google_api.createEvent(createEventReq, function(err,event){
			
			var eventId = event.id
			// remove a removable property
			delete event.description
			
			google_api.updateEvent(event, function(err,event){
				
				// check that the returned event does not have the field
				should.not.exist(event.description)
				
				
				// double confirm by locating the event and ensuring it does not have description
				google_api.getEventsForTimeSpan(startDate,endDate, function(err, events){
					var foundEvent = false
					for( event in events){
						if(event.id === eventId ){
							should.not.exist(event.description)
							foundEvent = true
						}
					}
					
					foundEvent.should.equal(true)
					
					done()
					
				})
				
				
			})
			
		})
		
	})
})