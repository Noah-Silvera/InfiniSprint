 var path = require('path')
 exports.paths =  {
		'userDataPath' : path.join( __dirname, './user_data'),
		'scriptsPath' : path.join( __dirname, './scripts'),
		'stylesPath' : path.join( __dirname, './styles' ),
		'testPath' : path.join( __dirname, './test' )
	}
	
exports.consts = {
		'sprintLength': 7,
		'eventPropWhiteList': ['rank'],
		'eventPropBlackList': ['id'],
	}


