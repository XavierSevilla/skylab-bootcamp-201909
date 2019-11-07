describe('logic - search ducks', () => {
    let name, surname, email, password, id, token, duckId = '5c3853aebd1bde8520e66e1b'

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else {
                call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
                    if (result.error) done(new Error(result.error))
                    else {
                        const { data } = result

                        id = data.id
                        token = data.token

                        done()
                    }
                })
            }
        })
    })

    it('should succeed on correct criteria (query)', done => {
        const query = 'blue'

        searchDucks(id, token, query, (error, ducks) => {
            expect(error).not.to.exist

            expect(ducks).to.exist
            expect(ducks.length).to.be.greaterThan(0)

            ducks.forEach(function (duck) {
                expect(duck).to.exist
                expect(typeof duck.id).to.equal('string')
                expect(duck.id.length).to.be.greaterThan(0)

                expect(duck.title).to.exist
                expect(typeof duck.title).to.equal('string')
                expect(duck.title.length).to.be.greaterThan(0)

                expect(duck.image).to.exist
                expect(typeof duck.image).to.equal('string')
                expect(duck.image.length).to.be.greaterThan(0)

                expect(duck.price).to.exist
                expect(typeof duck.price).to.equal('string')
                expect(duck.price.length).to.be.greaterThan(0)

                expect(duck.isFav).to.be.true
            })

            done()
        })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [duckId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct criteria (query)', done => {
            const query = 'blue'

            searchDucks(id, token, query, (error, ducks) => {
                expect(error).to.not.exist

                expect(ducks).to.exist
                expect(ducks.length).to.be.greaterThan(0)

                const hasFav = ducks.some(duck => duck.isFav)

                expect(hasFav).to.be.true

                ducks.forEach(function (duck) {
                    expect(duck).to.exist
                    expect(typeof duck.id).to.equal('string')
                    expect(duck.id.length).to.be.greaterThan(0)

                    expect(duck.title).to.exist
                    expect(typeof duck.title).to.equal('string')
                    expect(duck.title.length).to.be.greaterThan(0)

                    expect(duck.image).to.exist
                    expect(typeof duck.image).to.equal('string')
                    expect(duck.image.length).to.be.greaterThan(0)

                    expect(duck.price).to.exist
                    expect(typeof duck.price).to.equal('string')
                    expect(duck.price.length).to.be.greaterThan(0)

                    duck.id === duckId ? expect(duck.isFav).to.equalTruthy() : expect(duck.isFav).to.equalFalsy()
                })

                done()
            })
        })
    })

    it('should fail on incorrect criteria', done => {
        const query = 'asdfljasdf'

        searchDucks(id, token, query, (error, ducks) => {
            expect(ducks).to.not.exist

            expect(error).to.exist

            expect(error.message).to.exist
            expect(typeof error.message).to.equal('string')
            expect(error.message.length).to.be.greaterThan(0)

            done()
        })
    })

    it('should fail on incorrect query or expression types', () => {
        // TODO cases when id and token have values diff from non-empty string
        
        expect(() => { searchDucks(id, token, 1) }).toThrowError(TypeError, '1 is not a string')
        expect(() => { searchDucks(id, token, true) }).toThrowError(TypeError, 'true is not a string')
        expect(() => { searchDucks(id, token, []) }).toThrowError(TypeError, ' is not a string')
        expect(() => { searchDucks(id, token, {}) }).toThrowError(TypeError, '[object Object] is not a string')
        expect(() => { searchDucks(id, token, undefined) }).toThrowError(TypeError, 'undefined is not a string')
        expect(() => { searchDucks(id, token, null) }).toThrowError(TypeError, 'null is not a string')

        expect(() => { searchDucks(id, token, 'red', 1) }).toThrowError(TypeError, '1 is not a function')
        expect(() => { searchDucks(id, token, 'red', true) }).toThrowError(TypeError, 'true is not a function')
        expect(() => { searchDucks(id, token, 'red', []) }).toThrowError(TypeError, ' is not a function')
        expect(() => { searchDucks(id, token, 'red', {}) }).toThrowError(TypeError, '[object Object] is not a function')
        expect(() => { searchDucks(id, token, 'red', undefined) }).toThrowError(TypeError, 'undefined is not a function')
        expect(() => { searchDucks(id, token, 'red', null) }).toThrowError(TypeError, 'null is not a function')
    })
})