const handleImage = (req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('submissions', 1)
    .returning('submissions')
    .then(count=>res.json(count[0]))
    .catch(err=>res.status('400').json('unable to update user'))
}

module.exports = {
    handleImage: handleImage
}