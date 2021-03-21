const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' },
];

function validategenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema)

}

app.get('/', (req, res) => {
    res.send(genres)
})

app.post('/', (req, res) => {

    //input validation using joi 
    const { error } = validategenre(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)


    const genre = {
        id: genres.length + 1,
        name: req.body.name // we can read it thnx to the middleware
    }
    genres.push(genre);
    //convention: when we add a new object to the server we should return 
    //that obj into the body of the response since the client may need its id 
    res.send(genre);
})

app.put('/:id', (req, res) => {
    //look up the genre 
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 
    const { error } = validategenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //update couse
    genre.name = req.body.name

    res.send(genre);
})

app.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('NOT FOUND ')//404

    res.send(genre)
})

app.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('NOT FOUND ')//404

    res.send(genre);
})

app.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('NOT FOUND ')//404

    //genres.filter(c => { if (c !== genre) return c; })
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre)
})


module.exports = router;