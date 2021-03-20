const Joi = require('joi'); //  Joi is a class
const express = require('express'); //express is a function
const app = express();

//We're adding a middleware
app.use(express.json())
//to parse json objects from tha body of the request 
//By default this feature is not enabled by express


const courses = [
    { id: 1, name: 'course1 ' },
    { id: 2, name: 'course2 ' },
    { id: 3, name: 'course3 ' }
]

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

}

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {

    //input validation using joi 
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)


    const course = {
        id: courses.length + 1,
        name: req.body.name // we can read it thnx to the middleware
    }
    courses.push(course);
    //convention: when we add a new object to the server we should return 
    //that obj into the body of the response since the client may need its id 
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //look up the course 
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('NOT FOUND ')//404

    //input validation using joi 
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //update couse
    course.name = req.body.name

    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('NOT FOUND ')//404

    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('NOT FOUND ')//404

    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('NOT FOUND ')//404

    //courses.filter(c => { if (c !== course) return c; })
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
})

const port = process.env.PORT || 3000;
// to change PORT:  set PORT=5000 in cmd
app.listen(port, () => {
    console.log(port);
});