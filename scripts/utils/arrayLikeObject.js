module.exports = exports = function arrayLikeObject(obj){
    this.obj = obj


    this.getByIndex = getByIndex
    function getByIndex(index){
        
    }

    this.insert = insert
    function insert(object,index){
        
    }

    // UNIMPLEMENTED
    // UNTESTED
    /**
     * Neccesary because I'm treating objects as lists
     * Moves an object from oldIndex in oldListRef to newIndex in newListRef
     * if new list ref is ommitted, the object is moved within the oldListRef
     * @param  {Integer} oldIndex  The index of the object to move in oldListRef
     * @param  {Integer} newIndex  The index to move the object to in newListRef
     * @param  {Object} oldListRef The old list containing the object
     * @param  {Object} newListRef the list to move the object into
     * @return {Object}            the newList with the object inserted
     */
    this.moveObjectToListIndex = moveObjectToListIndex
    function moveObjectToListIndex( oldIndex, newIndex, oldListRef,newListRef ){
    }


    this.insertObjectAtListIndex = insertObjectAtListIndex
    function insertObjectAtListIndex(){
    console.log(" I insert an object at a list index")
    }

}
