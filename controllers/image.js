const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'd4ed804d96aa489fa7435e43fadf8938'
})


const handleApiCall = (req, res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data)
    })
    .catch(console.log)
}

const handleImage = (req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('submissions', 1)
    .returning('submissions')
    .then(count=>res.json(count[0]))
    .catch(err=>res.status('400').json('unable to update user'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}