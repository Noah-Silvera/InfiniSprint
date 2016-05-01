module.exports = function arrayLikeObject(obj){
    
    ////////////////////////////////////////////////////////////
    ////////////// Constructor ////////////////////////////////
    //////////////////////////////////////////////////////////
    
    if( typeof obj !== typeof {}){
        throw "did not pass an object"
    }
    
    // assign all the properties from the old obj so it maintains it's indexibility

    // Represents the current object properties
    this.keys = keys = Object.keys(obj)
    
    // Assign all the given object properties to the object we are creating
    Object.assign(this,obj) 
    
    this.arr = arr = []
    this.length = length = 0
    
    var _this = this
    
    // initialize the object array
    createArrFromObj()
    
    
    ////////////////////////////////////////////////////////////
    ////////////// Object Functions ////////////////////////////////
    //////////////////////////////////////////////////////////
    
    this.createArrFromObj = createArrFromObj  
    function createArrFromObj(){
        // reset the array property
        arr = []
        
        for( var i =0; i < keys.length; i++){
            // push an object in the form { id : content } onto the array
            // in the order the the properties appear in the object
            var objToPush = {}
            objToPush[keys[i]] = obj[keys[i]] 
            
            arr.push( objToPush )
        }
        
        length = arr.length
        
    }
    
    this.createObjFromArr = createObjFromArr
    function createObjFromArr(){
        
        // Delete all the old properties
        keys.forEach(function(key){
            delete this[key]
        })
        
        keys = []

        arr.forEach(function( item, index, arr ){
            // add each new property from the array to the list of keys
            var objKey = getObjKey(index)
            keys.push(objKey)
            
            // assign a new property to the object for each property in the array
            _this[objKey] = item[objKey]
        })
    }
    

    this.get = get  
    function get(index){
        var objKey = getObjKey(index)

        return arr[index][objKey]
    }
    
    // index is optional
    // object must be in correct form, indexed by ID
    // equivalent to adding a new property onto an arrayLikeObject
    this.set = set  
    function set(object,index){
        arr[index] = object
        createObjFromArr()
    }

    this.insert = insert  
    function insert(object,index){
        
        var front = arr.slice(0,index)
        var back = arr.slice(index)
        
        front.push(object)
        
        arr = front + back
        
        createObjFromArr()
        
    }
    
    this.del = del  
    function del(index) {
        

        var front = arr.slice(0,index)
        var back = arr.slice(index+1)

        
        
        arr = front + back
        
        createObjFromArr()
        
    }
    
    this.move = move  
    function move(index1,index2){
        
        var obj2 = arr[index2]
        var obj1 = arr[index1]
        
        this.set(obj2,index1)
        this.set(obj1,index2)

    }
    
    this.getObjKey = getObjKey  
    function getObjKey(index){
        return Object.keys(arr[index])[0]
    }

}
