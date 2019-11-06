const express = require('express')
const Landing = require('./components/landing')
const View = require('./components/view')
const Login = require('./components/login')
const Feedback = require('./components/feedback')
const Register = require('./components/register')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({body: Landing({register: '/register'})})) 
})

app.get('/register', (req, res) => {
    res.send(View({body: Register()}))

})

app.get('/login', (req, res) => {
    res.send(View({body: Login()}))

})

app.post('/login', (req, res)=>{
    let content = ''
    req.on('data', chunk => {content += chunk})

    req.on('end', ()=> {

       const {name, surname, email, password } = querystring.parse(content)

       try {
          registerUser(name, surname, email, password, error=> {
              if (error) {
                  res.send(View({body: Feedback()}))
              }else {
                  res.send(View({body: Login()}))
              }
          })

       } catch(error){

       }
       

    })



})

app.listen(port, () => console.log(`server running on port ${port}`))

