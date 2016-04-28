var arrayLikeObject = require("./../../scripts/utils/arrayLikeObject")
var should = require('chai').should()
var data_utils = require('./../../scripts/server/data_utils')
var fs = require('fs')


describe('arrayLikeObject', function(){
    
    var indexedData = fs.readFileSync('./test/fake_data/initData.json')
    
    var sprint = arrayLikeObject(indexedData['sprint'])
    var backlog = arrayLikeObject(indexedData['backlog'])
    
    it('Should allow retrieving of an object by index', function(){
        
        var firstSprintItem = sprint.getByIndex(0) 
        should.exist(firstSprintItem)
        
        // check that it retrieved the correct item
        firstSprintItem.should.deepEqual( indexedData['02ous69h6u6h7halum2va6r3dg'] )

        var firstBacklogItem = backlog.getByIndex(1) 
        should.exist(firstBacklogItem)
        
        // check that it retrieved the correct item
        firstBacklogItem.should.deepEqual( indexedData['24734vo522s26jmlq38iipibc4'] )
        
        var lastBacklogItem = backlog.getByIndex(-1)
        should.exist(lastBacklogItem)
        
        // check that it retrieved the correct item
        lastBacklogItem.should.deepEqual( indexedData['3l1mr97gdfr09p3jrtshc86rd0_20160412'] )
        
        var lastBacklogItemDiffMethod = backlog.getByIndex(3)
        
        // check that it actually retrieved the last backlog item
        // check for no index errors with edge cases
        lastBacklogItemDiffMethod.should.deepEqual(lastBacklogItem)
        
        // edge case -> -1 should retrieve the last element in the object
        // all other negative indexes should be rejected

            
    });
    
    it('Should allow insertion of an object by index', function(){
        
        // edge case -> -1 should insert the element last in the object
        // all other negative indexes should be rejected
        
        var newEventIndexed = { 
            "123123": {
                "summary": "new Event",
                "description": "this is a new event",
                "start": {
                    "date": "2016-04-27"
                }
            }
        }
        
        // insert in the first place
        
        sprint.insert(newEventIndexed,0)
        
        sprint.getByIndex(0).should.deepEqual(newEventIndexed)
        
        sprint.should.have.length(3)
        
        // insert in the second place
        
        backlog.insert(newEventIndexed,1)
        
        backlog.getByIndex(1).should.deepEqual(newEventIndexed)
        
        backlog.should.have.length(5)
        
        // insert in the last place
        
        sprint.insert(newEventIndexed,2)
        
        sprint.getByIndex(2).should.deepEqual(newEventIndexed)
        
        sprint.should.have.length(4)
        
    })

    it('Should allow deletion of an object by index', function(){
        
        // edge case -> -1 should delete the element last in the object
        // all other negative indexes should be rejected
        
        "test".should.equal('implemented')
        
    })
    
    it('Should allow moving of an object to another index', function(){
        
        // edge case -> -1 should move the element to the last place in the object
        // all other negative indexes should be rejected
        
        "test".should.equal('implemented')
        
    })

    
})