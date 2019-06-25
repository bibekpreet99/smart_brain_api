const handleSignin = (req, res, bcrypt, db)=>{
    const { password, email } = req.body;
    if(!password || !email){
        return res.status('400').json('wrong form submission')
    }
    db('login').select('email', 'hash')
        .where('email', '=', email)
        .then(data=>{
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid){
                db('users').select('*').where('email', '=', email)
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