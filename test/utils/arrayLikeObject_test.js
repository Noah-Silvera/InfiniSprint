var arrayLikeObject = require("./../../scripts/utils/arrayLikeObject")
var should = require('chai').should()
var data_utils = require('./../../scripts/server/data_utils')
var fs = require('fs')


describe('new arrayLikeObject', function(){
    
    var indexedData = JSON.parse(fs.readFileSync('./test/fake_data/initData.json','utf-8'))
    this.timeout(50000)
    
    var newEventIndexed = { 
        "123123": {
            "summary": "new Event",
            "description": "this is a new event",
            "start": {
                "date": "2016-04-27"
            }
        }
    }
   
    
    it('Should allow retrieving of an object by index', function(){
        // console.log( typeof indexedData['sprint'])
        var sprint = new arrayLikeObject(indexedData['sprint'])
        var backlog = new arrayLikeObject(indexedData['backlog'])
        
        var firstSprintItem = sprint.get(0) 
        should.exist(firstSprintItem['02ous69h6u6h7halum2va6r3dg'])
      
        
        // check that it retrieved the correct item
        firstSprintItem['02ous69h6u6h7halum2va6r3dg'].should.eql( sprint['02ous69h6u6h7halum2va6r3dg'] )

        var firstBacklogItem = backlog.get(0) 
        should.exist(firstBacklogItem)
        
        // check that it retrieved the correct item
        firstBacklogItem['24734vo522s26jmlq38iipibc4'].should.eql( backlog['24734vo522s26jmlq38iipibc4'] )
        
        var lastBacklogItem = backlog.get(-1)
        should.exist(lastBacklogItem)
        
        // check that it retrieved the correct item
        lastBacklogItem['3l1mr97gdfr09p3jrtshc86rd0_20160412'].should.eql( backlog['3l1mr97gdfr09p3jrtshc86rd0_20160412'] )
        
        var lastBacklogItemDiffMethod = backlog.get(3)
        
        // check that it actually retrieved the last backlog item
        // check for no index errors with edge cases
        lastBacklogItemDiffMethod.should.eql(lastBacklogItem)
        
        // edge case -> -1 should retrieve the last element in the object
        // all other negative indexes should be rejected

            
    });
    
    it('Should allow insertion of an object by index', function(){
        
        var sprint = new arrayLikeObject(indexedData['sprint'])
        var backlog = new arrayLikeObject(indexedData['backlog'])
        
        // edge case -> -1 should insert the element last in the object
        // all other negative indexes should be rejected
        
        // insert in the first place
        
        
        // Get the content of the new event
        var newEventContent = newEventIndexed[Object.keys(newEventIndexed)[0]]
        
        sprint.insert(newEventIndexed,0)
        
        sprint.get(0).should.eql(newEventIndexed)
        
        sprint.length().should.equal(3)
        
        // insert in the second place
        
        backlog.insert(newEventIndexed,1)
        
        backlog.get(1).should.eql(newEventIndexed)
        
        backlog.length().should.equal(5)
        
        // insert in the last place
        
        sprint.insert(newEventIndexed,2)
        
        sprint.get(2).should.eql(newEventIndexed)
        
        sprint.length().should.equal(4)
        
    })

    it('Should allow deletion of an object by index', function(){

        
        var sprint = new arrayLikeObject(indexedData['sprint'])
        var backlog = new arrayLikeObject(indexedData['backlog'])
        
        // edge case -> -1 should delete the element last in the object
        // all other negative indexes should be rejected
        
        
        // try deleting the first item in the list
        var firstItem = sprint.get(0)
        var secondItem = sprint.get(1)
        

        
        var deletedItem = sprint.del(0)
        
        should.exist(deletedItem)
        
        deletedItem[Object.keys(deletedItem)[0]].should.eql(firstItem)
        
        sprint.get(0).should.eql(secondItem)
        
        sprint.length().should.equal(1)
        
        firstItem = backlog.get(0)
        secondItem = backlog.get(1)
        var lastItem = backlog.get(-1)
        var secondLastItem = backlog.get(2)
        
        
        // try deleting the last item in the list

        
        deletedItem = backlog.del(-1)
        
        should.exist(deletedItem)
        
        deletedItem[Object.keys(deletedItem)[0]].should.eql(lastItem)
        
        backlog.get(-1).should.eql(secondLastItem)
        
        backlog.length().should.equal(3)
           
        // try deleting an item in the middle of the list
           
        deletedItem = backlog.del(1)
        
        should.exist(deletedItem)
        
        deletedItem[Object.keys(deletedItem)[0]].should.eql(secondItem)
        
        backlog.get(0).should.eql(firstItem)
        
        backlog.get(1).should.eql(secondLastItem)
        
        backlog.length().should.equal(2)
        

    })
    
    it('Should allow moving of an object to another index', function(){
        
        var sprint = new arrayLikeObject(indexedData['sprint'])
        var backlog = new arrayLikeObject(indexedData['backlog'])
        
        // edge case -> -1 should move the element to the last place in the object
        // all other negative indexes should be rejected
        

           
        // swap items in a 2 item list
        
        var firstItem = sprint.get(0)
        var secondItem = sprint.get(1)
        
        sprint.move(0,1)
        
        sprint.get(0).should.eql(secondItem)
        sprint.get(1).should.eql(firstItem)
        
        sprint.length().should.equal(2)
        
        // swap items in a 2 item list
        sprint.move(0,-1)
        
        sprint.get(0).should.eql(firstItem)
        sprint.get(1).should.eql(secondItem)
        
        sprint.length().should.equal(2)
        
        sprint.move(-1,0)
        
        sprint.get(0).should.eql(secondItem)
        sprint.get(1).should.eql(firstItem)
        
        sprint.length().should.equal(2)
        
        
        // perform operations that should not change the list
        
        firstItem = sprint.get(0)
        secondItem = sprint.get(1)
        
        sprint.move(0,0)
        
        sprint.get(0).should.eql(firstItem)
        sprint.get(1).should.eql(secondItem)
        
        sprint.length().should.equal(2)
        
        sprint.move(1,1)
        
        sprint.get(0).should.eql(firstItem)
        sprint.get(1).should.eql(secondItem)
        
        sprint.length().should.equal(2)
        
        sprint.move(-1,-1)
        
        sprint.get(0).should.eql(firstItem)
        sprint.get(1).should.eql(secondItem)
        
        sprint.length().should.equal(2)
        
        // swap first and last items in a larger list
        
        firstItem = backlog.get(0)
        lastItem = backlog.get(-1)
        
        // swap first and last without (-1)
        backlog.move(0,3)
        
        backlog.get(0).should.eql(lastItem)
        backlog.get(3).should.eql(firstItem)
        
        // swap first and last with (-1)
        backlog.move(0,-1)
        
        backlog.get(0).should.eql(firstItem)
        backlog.get(-1).should.eql(lastItem)
        
        // swap first with middle item
        
        firstItem = backlog.get(0)
        thirdItem = backlog.get(2)
        
        backlog.move(0,2)
        
        backlog.get(0).should.eql(thirdItem)
        backlog.get(2).should.eql(firstItem)
        
        
        // swap two middle items
        
        secondItem = backlog.get(1)
        thirdItem = backlog.get(2)
        
        backlog.move(1,2)
        
        backlog.get(1).should.eql(thirdItem)
        backlog.get(2).should.eql(secondItem)
        
    })
    
    it('Should allow retrieving of a numeric index by Id', function(){
        var backlog = new arrayLikeObject(indexedData['backlog'])
    
        var idsInOrder =   ['24734vo522s26jmlq38iipibc4',
                            '4d3hhpae0ftsqh6ns2dqo86rm4_20160410',
                            'eftipnbkcm845foa8t05b80mvs',
                            '3l1mr97gdfr09p3jrtshc86rd0_20160412']
                
        for(var i =0; i < idsInOrder.length; i++){
            var curId = idsInOrder[i]

            should.exist(backlog.getIndex(curId))
            backlog.getIndex(curId).should.equal(i)
        }

        
    })

    
})