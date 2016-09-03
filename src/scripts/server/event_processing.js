

exports.rankLast = rankLast

function rankLast(newEvent, currentEvents){

    if( currentEvents.length === 0){
        initialRanking( newEvent )
    } else {
        // set it last in the stack of events
        newEvent.rank = currentEvents[currentEvents.length -1].rank + 1;
    }
    

    return newEvent
}

exports.rankFirst = rankFirst

function rankFirst( newEvent, currentEvents){

    if( currentEvents.length === 0){
        initialRanking( newEvent )
    } else {
        newEvent.rank = currentEvents[0].rank - 1;
    }


    return newEvent
}

function initialRanking( newEvent ){
    newEvent.rank = 0
}

function cleanEvents(){

    
}