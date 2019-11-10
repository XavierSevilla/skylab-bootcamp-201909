const express = require('express')
const { View, Landing, Register, Login, Search, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, toggleFavDuck, retrieveDuck } = require('./logic')
// const logic = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')

const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))

app.get('/', cookieParser, (req, res) => {
    const { cookies: { id } } = req
    const session = sessions[id]

    if (session) {
        let route
        if (session.vengo === 'detail') route = session.routeDetail
        else route = session.routeSearch
        return res.redirect(`${route}`)
    }

    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', cookieParser, (req, res) => {
    const { cookies: { id } } = req
    const session = sessions[id]

    if (session) {
        let route
        if (session.vengo === 'detail') route = session.routeDetail
        else route = session.routeSearch
        return res.redirect(`${route}`)
    }

    res.send(View({ body: Register({ path: '/register' }) }))
})

app.post('/register', bodyParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .then(() => res.redirect('/'))
            .catch(({ message }) => res.send(View({ body: Register({ path: '/register', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Register({ path: '/register', error: message }) }))
    }
})

app.get('/login', cookieParser, (req, res) => {
    const { cookies: { id } } = req
    const session = sessions[id]

    if (session) {
        let route
        if (session.vengo === 'detail') route = session.routeDetail
        else route = session.routeSearch
        return res.redirect(`${route}`)
    }
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', bodyParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(credentials => {
                const { id, token } = credentials

                sessions[id] = { token }

                res.setHeader('set-cookie', `id=${id}`)

                res.redirect('/search')
            })
            .catch(({ message }) => {
                res.send(View({ body: Login({ path: '/login', error: message }) }))
            })
    } catch ({ message }) {
        res.send(View({ body: Login({ path: '/login', error: message }) }))
    }
})

app.get('/search', cookieParser, (req, res) => {
    const { cookies: { id }, query: { q: query } } = req

    if (!id) return res.redirect('/')

    const session = sessions[id]

    if (!session) return res.redirect('/')

    const { token } = session

    session.routeSearch = '/search'

    if (!token) return res.redirect('/')

    let name

    try {
        retrieveUser(id, token)
            .then((data) => {
                name = data.name
                session.name = name

                if (!query) return res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))

                session.query = query
                session.routeSearch = `/search?q=${query}`
                session.vengo = 'search'

                return searchDucks(id, token, query)
                    .then(ducks => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', detail: '/duck' }) })))
            })
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }
})

app.post('/logout', cookieParser, (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = req

    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')
})

app.post('/fav', cookieParser, bodyParser, (req, res) => {
    const { cookies: { id }, body: { id: duckId } } = req

    if (!id) return res.redirect('/')

    const session = sessions[id]

    const { token, query, name, vengo } = session

    if (!session) return res.redirect('/')

    let route
    if (vengo === 'detail') route = session.routeDetail
    else route = session.routeSearch

    try {
        toggleFavDuck(id, token, duckId)
            .then(res.redirect(route))
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }
})

app.get('/duck/:id', cookieParser, (req, res) => {

    // console.log(req)

    const { cookies: { id }, params: { id: duckId } } = req

    if (!id) return res.redirect('/')

    const session = sessions[id]

    const { token, query, name, routeSearch } = session

    if (!session) return res.redirect('/')

    if (!duckId) return res.redirect(`${session.routeSearch}`)

    if (duckId != 'icon.png') session.routeDetail = `/duck/${duckId}`

    try {   
        retrieveUser(id, token)
        .then((data) => {
            session.vengo = 'detail'

            return retrieveDuck(id, token, duckId)
                .then((duck) => {
                    res.send(View({body: Detail({item: duck, onBack: routeSearch, favPath: '/fav'})}))
                })
        })       
        .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))        
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }

})

app.listen(port, () => console.log(`server running on port ${port}`))

