const Express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = new Express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            submissions: 0,
            time: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            submissions: 0,
            time: new Date()
        }
    ],
}

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.json(database.users)
})

app.post('/signin', (req, res)=>{
    if(req.body.email=== database.users[0].email && req.body.password === database.users[0].password)
    { 
        res.json(database.users[0])
    }
    else{
        res.status('400').json('invalid user')
    }
})

app.post('/register', (req, res)=>{
    database.users.push({
        id: '125',
        name: req.body.name,
        email: req.body.email,
        submissions: 0,
        time: new Date()
    })
    res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user=>{
        if(user.id=== id){
            found= true;
            return res.json(user);
        }
    })

    if(!found)
    {
        res.status('400').json('no such user')
    }
})


app.put('/image', (req, res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user=>{
        if(user.id=== id){
            found= true;
            user.submissions++
            return res.json(user.submissions);
        }
    })

    if(!found)
    {
        res.status('400').json('no such user')
    }
})

app.listen('3000', ()=>{
    console.log('app working on port 3000')
})