require('express-async-errors')
const error = require('./middleware/error')
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const winston = require('winston');//default logger
require('winston-mongodb');
const Joi = require('joi'); //  Joi is a class
Joi.objectId = require('joi-objectid')(Joi);  //  Joi is a class
const express = require('express'); //express is a function
const genres = require('./routes/genres');
const costumers = require('./routes/costumers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

//caughting unhandleded exceptions:
process.on("uncaughtException", (ex) => {
    console.log("WE GOT AN uncaughtException ")
    winston.error(ex.message, ex)
})

////winston and error.js only catches express errors /request processing pipeline
winston.add(winston.transports.File, { filename: 'logfile.log' })
//creates a new file "logfile" to save the logs in it 
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/moviesDB',
    level: 'error'//only error level will be logged
    //level:'info' ==> logged levels are : error , warn , info
})
//creates a new collection "log" to save the logs in it in MongoDB

//error thrown outside the context of processsing a request , Express
throw new Error('Something failed during startup ')

if (!config.get("jwtPrivateKey")) {
    console.log('FATAL ERROR : jwtPrivateKey is not defined ')
    process.exit(1) //0 success
}

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/moviesDB')
    .then(() => console.log('coonected mongo'))
    .catch(err => console.log(err))

const app = express();
app.use(express.json());
app.use(helmet());//to log requests 

app.use('/api/genres', genres)
app.use('/api/costumers', costumers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)



app.use(error)



if (app.get("env") === "development") {
    app.use(morgan('tiny'));//to log requests 
    console.log('Morgan enabled only in dev envt')
}

console.log('process.env.NODE_ENV' + process.env.NODE_ENV)
console.log('app.get("env")' + app.get('env'))
console.log('config.get("name")' + config.get('name'))
console.log('config.get("mail.host")' + config.get('mail.host'))
//to set the paswword : $set app-pwd=1234 in cmd
//console.log('config.get("mail.password")' + config.get('mail.password'))


//We're adding a middleware
app.use(express.json())
//to parse json objects from tha body of the request 
//By default this feature is not enabled by express

const port = process.env.PORT || 3000;
// to change PORT:  set PORT=5000 in cmd
app.listen(port, () => {
    console.log(port);
});