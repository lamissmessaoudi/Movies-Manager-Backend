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

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {
    //input validation  
    if (!req.body.name || req.body.name < 3) {
        res.status(400).send('name is required')
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name // we can read it thnx to the middleware
    }
    courses.push(course);
    //convention: when we add a new object to the server we should return 
    //that obj into the body of the response since the client may need its id 
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('NOT FOUND ')//404
    res.send(course)
})

const port = process.env.PORT || 3000;
// to change PORT:  set PORT=5000 in cmd
app.listen(port, () => {
    console.log(port);
});