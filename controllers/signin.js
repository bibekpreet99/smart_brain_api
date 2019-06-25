const handleSignin = (req, res, bcrypt, db)=>{
    db('login').select('email', 'hash')
        .where('email', '=', req.body.email)
        .then(data=>{
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                db('users').select('*').where('email', '=', req.body.email)
                .then(user=>{
                    res.json(user[0])
                })
                .catch(err=>res.json('unable to find user'))
            }
            else{
                res.status('400').json('unable to signin')
            }
        })
        .catch(err=>res.status('400').json('invalid credentials'))
}

module.exports ={
    handleSignin: handleSignin
}