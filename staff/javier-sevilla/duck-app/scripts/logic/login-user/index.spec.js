describe('Logic - login User', function() {
    it('should succeed on correct login', done=> {
        let email = "xaviersevilla@gmail.com" 
        let password = '123'

        loginUser(email, password, (error,response)=>{

            const { id, token } = response
            expect(error).toBeUndefined();  
            expect(id).toBe('5dab3217dcc25e0009e06e65')
            expect(typeof token).toBe('string')
            done();



         })
    })

    it('should succeed on incorrect login by the password', done=>{
        let email = "xaviersevilla@gmail.com" 
        let password = '1234'

        loginUser(email, password, (error,response)=>{
            expect(typeof error.message).toBe('string') 
            expect(error).toBeDefined()
            done();



         })
    })

})