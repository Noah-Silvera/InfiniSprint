describe('Model Test',function(){
    it('Should allow functions to listen and have data passed to them',function(done){
        
        
        require([srcPath + 'Model'],function(Model){
            
            Model.listen(function(data){
                console.log(data)
                done()
            })

            Model.process({"hello":"world"})
        })

    })

    it('should retain the scope of the listening functions',function(done){
        'test'.should.equal('implemented')
    })

    it('should not fail if one listener throws an error in its callback',function(done){
        'test'.should.equal('implemented')
    })
})