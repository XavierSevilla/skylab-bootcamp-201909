const express = require('express')
const Landing = require('./components/landing')
const View = require('./components/view')
const Login = require('./components/login')
const Feedback = require('./components/feedback')
const Register = require('./components/register')
const Search = require('./components/search')
const searchDucks = require('./logic/search-ducks')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/authenticate-user')

const { argv: [, , port = 8080] } = process
let credentials

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))

})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))

})


// app.get('/feedback', (req, res) => {
//     res.send(View({body: Feedback({message})}))

// })

app.post('/register', (req, res) => {
    let content = ''
    req.on('data', chunk => { content += chunk })

    req.on('end', () => {

        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) {
                    res.send(View({ body: Feedback() }))
                } else {
                    res.redirect('/login')
                }
            })

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }

    })

})

app.post('/login', (req, res) => {
    let content = ''
    req.on('data', chunk => { content += chunk })

    req.on('end', () => {

        const { email, password } = querystring.parse(content)

        try {
            authenticateUser(email, password, (error, response) => {
                debugger
                if (error) {
                    res.send(View({ body: Feedback() }))
                } else {
                    credentials = _credentials
                    res.redirect('/search')
                }
            })

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }

    })
})

app.get('/search', (req, res) => {
    const { query: { q: query } } = req


    try {
        const { id, token } = credentials

        retrieveUser(id, token, (error, response) => {
            if (error) {
                res.send(View({ body: Feedback() }))
            } else {
                res.redirect('/search')
            }
        })

    } catch (error) {
        res.send(View({ body: Feedback() }))
    }

})



app.listen(port, () => console.log(`server running on port ${port}`))

