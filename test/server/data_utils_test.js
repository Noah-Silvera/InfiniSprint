var paths = require('./../../src/utils/_globals').paths

// paths.scriptsPath + '/server' + '/data_utils'
var data_utils = require( './../../src/server/data_utils' );
var should = require('chai').should();

describe('purgeProperties', function(){
	
	var obj = [{
		"keep1": {
			"subProp": "val"
		},
		"keep2": "val",
		"delete2":"val",
		"delete3":"val"
	},
	{
		"keep1": {
			"subProp": "val"
		},
		"keep2": "val",
		"delete1": {
			"subProp": {
				"subSubProp" : "val",
				"mwahahah" :"val"
			}
		},
		"delete2":"val",
	},
	{
		"keep1": "val",
		"delete1": {
			"subProp": {
				"subSubProp" : "val",
				"mwahahah" :"val"
			}
		},
		"keep2":"val",
		"delete2":"val",
		"delete3":"val"
	}]

	var keepArr = ['keep1','keep2']
	var delArr = ['delete1','delete2','delete3']

	var purged = data_utils.purgeProperties(obj,keepArr)
	
	it('Should take an array of objects and keep only the properties in keepArr', function(){

		purged.forEach( function( obj, index ){
			obj.should.have.all.keys(keepArr)
			obj.should.not.have.any.keys(delArr)
		});
	});
});

describe('addPropsToObject', function(){

	// original object
	var obj = {
		"oldProp1" : {
			"subProp" : "val"
		},
		"oldProp2": "val"
	}

	// preserve the old props for a later check
	var oldProps = []

	Object.keys(obj).forEach( function( key, index ) {
		// create a mini object for each prop
		var curProp = {}
		curProp[key] = obj[key]

		// push that object onto the array of oldProps
		oldProps.push( curProp )

	});

	// Array of props to add to the object

	var newProps = [
		{ "newProp1": {
			"subObj": "val"
			}
		},
		{ "newProp2":"val" },
		{ "newProp3":"val" }
	]

	// Add the properties to the old object
	data_utils.addPropsToObject(obj,newProps)

	it('should add all the new props to the object', function(){
		
		newProps.forEach( function(prop, index){
			var curKey = Object.keys(prop)[0]

			// new prop inserted
			should.exist( obj[curKey] )
			// has correct value
			obj[curKey].should.equal(newProps[index][curKey]);

		});
	});

	it('should not delete any old props', function(){

		oldProps.forEach( function(prop, index){
			var curKey = Object.keys(prop)[0]

			// new prop inserted
			should.exist( obj[curKey] )
			// has correct value
			obj[curKey].should.equal(oldProps[index][curKey]);

		});
	});

	it('should have an appropiate length', function(){
		Object.keys(obj).should.have.length(5)
	})

});
