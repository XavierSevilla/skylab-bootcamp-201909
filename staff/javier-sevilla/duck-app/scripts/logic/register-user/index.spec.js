describe('Logic - register User', function() {
    let name, surname, email, password, age, gender

    beforeEach(done=> {
        name = "Xavier"
        surname = "Sevilla"
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        age = 25
        gender = "princesa"

        done()

    })

    it('should succeed on correct register', done=> {
        registerUser(email, password, name, surname, age, gender, (error,response)=>{
            const  id  = response; 
            expect(error).toBeUndefined();  
            expect(typeof id).toBe('string')
            done();

         })
    })

    it('should succeed on incorrect login by the password', done=>{
        let email = "xaviersevilla@gmail.com" 
        let password = '1234'

        registerUser(email, password, name, surname, age, gender, (error,response)=>{
            expect(typeof error.message).toBe('string') 
            expect(error).toBeDefined()
            done();
         })
    })

    it('should fail on incorrect id or expression types', function() {
        expect(function() { registerUser(1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { registerUser(true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { registerUser([]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { registerUser({}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { registerUser(undefined); }).toThrowError(TypeError, 'undefined is not a string');
        expect(function() { registerUser(null); }).toThrowError(TypeError, 'null is not a string');

        expect(function() { registerUser('red','red','red','red','red','red', 1); }).toThrowError(TypeError, '1 is not a function');
        expect(function() { registerUser('red','red','red','red','red','red', true); }).toThrowError(TypeError, 'true is not a function');
        expect(function() { registerUser('red','red','red','red','red','red', []); }).toThrowError(TypeError, ' is not a function');
        expect(function() { registerUser('red','red','red','red','red','red', {}); }).toThrowError(TypeError, '[object Object] is not a function');
        expect(function() { registerUser('red','red','red','red','red','red', undefined); }).toThrowError(TypeError, 'undefined is not a function');
        expect(function() { registerUser('red','red','red','red','red','red', null); }).toThrowError(TypeError, 'null is not a function');

        expect(function() { registerUser('green',1); }).toThrowError(TypeError, '1 is not a string');
        expect(function() { registerUser('green',true); }).toThrowError(TypeError, 'true is not a string');
        expect(function() { registerUser('green',[]); }).toThrowError(TypeError, ' is not a string');
        expect(function() { registerUser('green',{}); }).toThrowError(TypeError, '[object Object] is not a string');
        expect(function() { registerUser('green',undefined); }).toThrowError(TypeError, 'undefined is not a string');
        expect(function() { registerUser('green',null); }).toThrowError(TypeError, 'null is not a string');


    });

})