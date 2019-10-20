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

    it('should fail on incorrect id or expression types', function() {
        expect(function() { loginUser(1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { loginUser(true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { loginUser([]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { loginUser({}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { loginUser(undefined); }).toThrowError(TypeError, 'undefined is not a string');
        expect(function() { loginUser(null); }).toThrowError(TypeError, 'null is not a string');

        expect(function() { loginUser('red','red', 1); }).toThrowError(TypeError, '1 is not a function');
        expect(function() { loginUser('red','red', true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { loginUser('red','red', []); }).toThrowError(TypeError, ' is not a function');
        expect(function() { loginUser('red','red', {}); }).toThrowError(TypeError, '[object Object] is not a function');
        expect(function() { loginUser('red','red', undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { loginUser('red','red', null); }).toThrowError(TypeError, 'null is not a function');
    });

})