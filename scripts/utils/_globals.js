 var appRoot = require('app-root-path')
 var path = require('path')
 exports.paths =  {
		'userDataPath' : path.join( appRoot.toString(), '\\user_data'),
		'scriptsPath' : path.join( appRoot.toString(), '\\scripts'),
		'stylesPath' : path.join( appRoot.toString(), '\\styles' ),
		'testPath' : path.join( appRoot.toString(), '\\test' )
	}
	
exports.consts = {
		'sprintLength': 7,
		'eventPropWhiteList': ['rank'],
		'eventPropBlackList': ['id'],
	}


