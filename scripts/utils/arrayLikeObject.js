module.exports = function arrayLikeObject(obj){
    
    ////////////////////////////////////////////////////////////
    ////////////// Constructor ////////////////////////////////
    //////////////////////////////////////////////////////////
    
    if( typeof obj !== typeof {}){
        throw "did not pass an object"
    }
    
    // assign all the properties from the old obj so it maintains it's indexibility

    // Represents the currest object properties
    this.keys = Object.keys(obj)
    
    // Assign all the given object properties to the object we are creating
    Object.assign(this,obj) 
    
    this.arr = []
    

    
    var _this = this
    
    // initialize the object array
    createArrFromObj()
    
    
    ////////////////////////////////////////////////////////////
    ////////////// Object Functions ////////////////////////////////
    //////////////////////////////////////////////////////////
    
    this.length = length
    function length(){
        return _this.arr.length
    }
    
    this.createArrFromObj = createArrFromObj  
    function createArrFromObj(){
        // reset the array property
        _this.arr = []
        
        for( var i =0; i < _this.keys.length; i++){
            // push an object in the form { id : content } onto the array
            // in the order the the properties appear in the object
            var objToPush = {}
            objToPush[_this.keys[i]] = obj[_this.keys[i]] 
            
            _this.arr.push( objToPush )
        }
        

    }
    
    this.createObjFromArr = createObjFromArr
    function createObjFromArr(){
        
        // Delete all the old properties
        _this.keys.forEach(function(key){
            delete _this[key]
        })
        
        _this.keys = []

        for(var i =0; i < _this.arr.length; i++){
            // add each new property from the array to the list of keys
            var objKey = getObjKey(i)
            _this.keys.push(objKey)
            
            // assign a new property to the object for each property in the array
            _this[objKey] = _this.arr[i][objKey]
        }
    }
    

    this.get = get  
    function get(index){
        
        if( index === -1){
            index = length() - 1 
        }
        
        var objKey = getObjKey(index)
        var obj = {};
        obj[objKey] = _this.arr[index][objKey]
        
        return obj
    }
    
    // index is optional
    // object must be in correct form, indexed by ID
    // equivalent to adding a new property onto an arrayLikeObject
    this.set = set  
    function set(object,index){
        
        if( index === -1){
            index = length() - 1 
        }
        
        _this.arr[index] = object
        createObjFromArr()
    }

    this.insert = insert  
    function insert(object,index){
        
        if( index === -1){
            index = length() - 1 
        }
        
        var front = _this.arr.slice(0,index)
        var back = _this.arr.slice(index)
        
        front.push(object)
        
        _this.arr = front.concat(back)
        
        createObjFromArr()
        
    }
    
    this.del = del  
    function del(index) {
        
        if( index === -1){
            index = length() - 1 
        }

        var front = _this.arr.slice(0,index)
        
        var deletedItem = _this.arr.slice(index,index+1)
        
        var back = _this.arr.slice(index+1)

        
        
        _this.arr = front.concat(back)
        
        createObjFromArr()
        
        return deletedItem
    }
    
    this.move = move  
    function move(index1,index2){
        
        if( index1 === -1){
            index1 = length() - 1 
        }
        
        if( index2 === -1){
            index2 = length() - 1 
        }
        
        var obj2 = _this.arr[index2]
        var obj1 = _this.arr[index1]
        
        this.set(obj2,index1)
        this.set(obj1,index2)

    }
    
    this.getObjKey = getObjKey  
    function getObjKey(index){
        
        if( index === -1){
            index = length() - 1 
        }
        
        return Object.keys(_this.arr[index])[0]
    }
    
    this.getIndex = getIndex
    function getIndex(id){
        if( typeof id !== typeof 'string'){
            throw 'must pass id string'
        } else {
            
            var index = -1
            _this.arr.forEach( function(item,i) {
                if( getObjKey(i) === id ){
                    index = i
                }
            })
            if( index === -1){
                throw 'id not found in object'
            }
            else {
                return index
            }
            
            
        }
    }
   

}
