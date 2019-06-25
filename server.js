const Express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'bibekpreet',
      password : '12345678',
      database : 'smart-brain'
    }
})

const app = new Express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.json(database.users)
})

app.post('/signin', (req, res)=> { signin.handleSignin(req, res, bcrypt, db) })

app.post('/register', (req,res)=>{ register.handleRegister(req, res, bcrypt, db) })

app.get('/profile/:id', (req, res)=>{ profile.handleProfile(req, res, db) })


app.put('/image', (req, res)=>{ image.handleImage(req, res, db) })

app.listen('3000', ()=>{
    console.log('app working on port 3000')
})