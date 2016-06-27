define(['socket-io'],function (io) {
    "use strict";
    class Model {

        constructor(){
            this.listeners = []
            this.model = {}
        }

        listen(func){
            console.log('new listener to model changes')
            if( typeof func !== typeof (function(){}) )
                throw "TypeError: Must pass a callback function" 

            this.listeners = this.listeners.concat(func)
        }

        broadcast(data){
            console.debug('broadcasting model data')
            for(var i = 0; i < this.listeners.length; i++){
                // call the callback function with the data
                this.listeners[i](data)
            }
        }

        process(data,formatter){
            console.debug('processing model data')
            if( formatter && typeof formatter === typeof (function(){})){
                data = formatter(data)
            }

            // do model updating here
            // temporary
            this.model = data

            this.broadcast(this.model)
        }

    }

    var model = new Model();

    return model
});