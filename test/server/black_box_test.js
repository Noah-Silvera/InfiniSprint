var sync_local_data = require( './../../src/server/sync_local_data' );
var data_utils = require('./../../src/server/data_utils')
var paths = require('./../../src/utils/_globals').paths
var socketClient = require('socket.io-client')
var should = require('chai').should();

var client;

function setUpSocket(done){
    client = socketClient.connect('http://localhost:80',{
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        })   
    client.on('connect', function(){
        console.log('connected to socket')
        done()
    })
}

function tearDownSocket(done){
    if(client.connected) {
        console.log('disconnecting...');
        client.disconnect();
    } else {
        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
        console.log('no connection to break...');
    }
    done();
}

    
describe('Set up initial user data', function(){
    
    var updated = false
    
    beforeEach(function(done){
        setUpSocket(done)

        client.on('eventsUpdated', function(){
            console.log('eventsUpdated')
            updated = true
        })
        
    })
    
    
    it('Should successfully grab and write the initial data', function(done){
        this.timeout(10000)
        sync_local_data.wipeData( function(){
            var updated = false
            client.emit('updateEvents')
            
            setTimeout(function(){
               updated.should.equal(true)
               
               data_utils.fetchData( paths.userDataPath + 'events.json', function(data){
                   should.exist(data)
               })
               
               done()
            },5000)
            
            
        })
    })
    
    it('Should be successful in subequent data grabs', function(){
        this.timeout(10000)
        client.emit('updateEvents')
        
        setTimeout(function(){
            updated.should.equal(true)
            
            data_utils.fetchData( paths.userDataPath + 'events.json', function(data){
                should.exist(data)
            })
            
            done()
        },5000)
    })
    
    
    afterEach(function(done) {
        tearDownSocket(done)
    });
})

describe('Process updates to textual calendar data content', function(){
    it('Should process updates to existing fields', function(){
        'test'.should.equal('not implemented')
    })
})

describe('Process updates to calendar date properties', function(){
    it('Should process insertion of new fields', function(){
        'test'.should.equal('not implemented')
    })
    
    it('Should process deletion of old fields', function(){
        'test'.should.equal('not implemented')
    })

})

describe('Process new and deleted events', function(){
    it('Should recognize new events added to google calendar', function(){
        'test'.should.equal('not implemented')
    })
    
    it('Should recognize events deleted from google calendar', function(){
        'test'.should.equal('not implemented')
    })
})

