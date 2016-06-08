 var appRoot = './'
 var path = require('path')
 
 exports.paths =  {
		'userDataPath' : path.join( appRoot, 'user_data'),
		'scriptsPath' : path.join( appRoot, 'src'),
		'stylesPath' : path.join( appRoot, 'styles' ),
		'testPath' : path.join( appRoot, 'test' )
	}
	
exports.consts = {
		'sprintLength': 7,
		// props not to delete from local
		// event data even though they don't exist in
		// google calendar data
		'eventPropWhiteList': ['rank'],
		// props to that shouldn't be added from google
		// calendar event data into the local data
		'eventPropBlackList': ['id'],
	}
	
exports.config = {
	// Forces a refresh on every load of the data
	// even if the data already exists
	'hardRefresh' : true,
	'logResponses' : true
}


