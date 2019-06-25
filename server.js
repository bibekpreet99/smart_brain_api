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
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
})

const app = new Express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.json('its working')
})

app.post('/signin', (req, res)=> { signin.handleSignin(req, res, bcrypt, db) })

app.post('/register', (req,res)=>{ register.handleRegister(req, res, bcrypt, db) })

app.get('/profile/:id', (req, res)=>{ profile.handleProfile(req, res, db) })

app.put('/image', (req, res)=>{ image.handleImage(req, res, db) })

app.post('/imageurl', (req, res)=>{ image.handleApiCall(req, res) })

app.listen(process.env.PORT || '3000', ()=>{
    console.log(`app working on port ${process.env.PORT}`)
})