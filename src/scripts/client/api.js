define(['browser_request', 'google_api'], function(request, googleApi){

    api = {
        'createEvent': createEvent,
        'updateEvent': updateEvent,
        'deleteEvent': deleteEvent
    }
    
    function createEvent(calId,event){

        
        return new Promise((resolve, reject) => {
            request.post(
                {
                    url:`/event/${googleApi.calId}/${event.id}`,
                    json:true,
                    body: JSON.stringify(event)
                }, function(err,res,event){
                    if(err) {
                        reject( 
                            new Error(`Error in creating event\n
                                        Request eventId:${event.id}, calId:${googleApi.calId}\n
                                        ${err}`)
                        )
                    } else if( res.status !== 200){
                        reject(
                            new Error(`Unrecognized HTTP status code ${res.status} occurred\n
                                        Request eventId:${event.id}, calId:${googleApi.calId}`)
                        )
                    } else {
                        console.debug(`Event CREATED\n
                                        \tid: ${event.id} and calId: ${googleApi.calId}\n
                                        \tsummary: ${event.summary}`)
                        resolve(event)  
                    }

            })
        });
    }

    function updateEvent(calId,event){
        return new Promise((resolve, reject) => {
            request.put(
                {
                    url:`/event/${googleApi.calId}/${event.id}`,
                    json:true,
                    body: JSON.stringify(event)
                }, (err,res,body) => {
                    if(err){
                        reject(
                            new Error(`Error in updating event\n
                                        Request eventId:${event.id}, calId:${googleApi.calId}\n
                                        ${err}`)
                        )
                    } else if( res.status !== 200){
                        reject(
                            new Error(`Unrecognized HTTP status code ${res.status} occurred\n
                                        Request eventId:${event.id}, calId:${googleApi.calId}\n`)
                        )
                    } else {
                        // console.info(`Remote event with id:${event.id} updated from calendar event`)  
                        console.debug(`Event UPDATED\n
                                        \tid: ${event.id} and calId: ${googleApi.calId}\n
                                        \tsummary: ${event.summary}`)
                        resolve(body)  
                    }

            })
        });

    }

    function deleteEvent(calId,event){
        return new Promise((resolve, reject) => {
            
        });

    }


    return api;
})