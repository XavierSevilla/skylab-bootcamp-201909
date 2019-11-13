const express = require('express')
const { View, Landing, Register, Login, Search, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, toggleFavDuck, retrieveDuck, retrieveFavDucks } = require('./logic')
// const logic = require('./logic')
// const { bodyParser, cookieParser } = require('./utils/middlewares')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const { argv: [, , port = 8080] } = process

const app = express()
app.set('view engine', 'pug')
app.set('views', 'components')

app.use(express.static('public'))

app.use(session({
    store: new FileStore({
    }),
    secret: 'a super secret thing',
    saveUninitialized: true,
    resave: true
}))

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    const { session } = req

    const { userId: id } = session

    if (id) {
        let route
        if (session.vengo === 'detail') route = session.routeDetail
        else route = session.routeSearch
        return res.redirect(`${route}`)
    }

    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (req, res) => {
    const { session } = req

    const { userId: id } = session

    if (id) {
        let route
        if (session.vengo === 'detail') route = session.routeDetail
        else route = session.routeSearch
        return res.redirect(`${route}`)
    }

    res.send(View({ body: Register({ path: '/register' }) }))
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .then(() => res.redirect('/'))
            .catch(({ message }) => res.send(View({ body: Register({ path: '/register', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Register({ path: '/register', error: message }) }))
    }
})

app.get('/login', (req, res) => {
    const { session } = req

    const { userId: id } = session

    if (id) {
        let route
        if (session.vengo === 'detail') route = session.routeDetail
        else route = session.routeSearch
        return res.redirect(`${route}`)
    }
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', formBodyParser, (req, res) => {
    const { session, body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(credentials => {
                const { id, token } = credentials

                session.userId = id
                session.token = token

                session.save(() => res.redirect('/search'))
            })
            .catch(({ message }) => {
                res.send(View({ body: Login({ path: '/login', error: message }) }))
            })
    } catch ({ message }) {
        res.send(View({ body: Login({ path: '/login', error: message }) }))
    }
})

app.get('/search', (req, res) => {
    const { session, query: { q: query } } = req

    if (!session) return res.redirect('/')

    const { userId: id, token } = session

    session.routeSearch = '/search'

    if (!token) return res.redirect('/')

    let name

    try {
        retrieveUser(id, token)
            .then((data) => {
                name = data.name
                session.name = name

                if (!query) return res.send(View({ body: Search({ path: '/search', name, logout: '/logout', favorites: '/favorites' }) }))

                return searchDucks(id, token, query)
                    .then(ducks => {
                        session.query = query
                        session.routeSearch = `/search?q=${query}`
                        session.vengo = 'search'
                        session.onBackDet= 'search'

                        session.save(() => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', favorites: '/favorites',  results: ducks, favPath: '/fav', detail: '/duck' }) })))
                    })    
            })
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout',favorites: '/favorites',  error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', favorites: '/favorites', error: message }) }))
    }
})

app.get('/favorites', (req, res) => {
    const { session, query: { q: query } } = req

    if (!session) return res.redirect('/')

    const { userId: id, token } = session

    session.routeFavorite = '/favorites'

    if (!token) return res.redirect('/')
    
    console.log('paso')

    let name = session.name
    
    try {
        return retrieveFavDucks(id, token)
            .then(ducks => {
                console.log('paso2')
                session.vengo = 'favorites'     
                session.onBackDet= 'favorites'     
                session.save(() => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', favorites: '/favorites',  results: ducks, favPath: '/fav', detail: '/duck', titulo: 'My favorites' }) })))
            })    
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout',favorites: '/favorites',  error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', favorites: '/favorites', error: message }) }))
    }
})

app.post('/logout', (req, res) => {
    // res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { session } = req

    session.destroy(() => {
        res.clearCookie('connect.sid', { path: '/' })
        // res.setHeader('set-cookie', 'connect.sid=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

        res.redirect('/')
    })
})

app.post('/fav', formBodyParser, (req, res) => {
    const { session, body: { id: duckId } } = req   

    if (!session) return res.redirect('/')

    const { userId: id, token, query, name, vengo } = session

    let route
    if (vengo === 'detail') 
       route = session.routeDetail
    else if (vengo === 'search' ) 
            route = session.routeSearch
        else route = session.routeFavorite  

    try {
        toggleFavDuck(id, token, duckId)
            .then(()=> {
                session.save(() => res.redirect(route))
            })
            .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }
})

app.get('/duck/:id', (req, res) => {

    const { session, params: { id: duckId } } = req

    const { userId: id, token, query, name, routeSearch, routeFavorite, onBackDet } = session

    if (!session) return res.redirect('/')

    if (!duckId) return res.redirect(`${session.routeSearch}`)

    session.routeDetail = `/duck/${duckId}`

    let route
    if (onBackDet === 'search') route =  routeSearch 
    else route =  routeFavorite

    try {   
        retrieveUser(id, token)
        .then((data) => {
            session.vengo = 'detail'

            return retrieveDuck(id, token, duckId)
                .then((duck) => {
                    res.send(View({body: Detail({item: duck, onBack: route, favPath: '/fav'})}))
                })
        })       
        .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))        
    } catch ({ message }) {
        res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
    }

})

app.listen(port, () => console.log(`server running on port ${port}`))

