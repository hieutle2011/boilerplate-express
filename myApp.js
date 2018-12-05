
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
    console.log(req.method, req.path, '-', req.ip)
    next()
})

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}))

/** 1) Meet the node console. */
console.log('Hello World')

/** 2) A first working Express Server */
// app.get('/', (req, res) => {
//     res.send('Hello Express')
// })

/** 3) Serve an HTML file */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'))

/** 5) serve JSON on a specific route */
app.get('/json', (req, res) => {
    let obj = { "message": "Hello json" }
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        console.log(obj)
        obj['message'] = obj['message'].toUpperCase()
        res.json(obj)
    } else {
        res.json(obj)
    }
})

/** 6) Use the .env file to configure the app */


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */

// This approach is useful to split the server operations into smaller units. 
// That leads to a better app structure, and the possibility to reuse code in different places. 
// This approach can also be used to perform some validation on the data. 
// At each point of the middleware stack you can block the execution of the current chain 
// and pass control to functions specifically designed to handle errors. 
// Or you can pass control to the next matching route, to handle special cases. 
// We will see how in the advanced Express section.

// In the route app.get('/now', ...) chain a middleware function and the final handler. 
// In the middleware function you should add the current time to the request object in the req.time key. 
// You can use new Date().toString(). In the handler, respond with a JSON object, 
// taking the structure {time: req.time}.

app.get('/now',
    (req, res, next) => {
        req['time'] = new Date().toString()
        next()
    },
    (req, res) => {
        res.json({ time: req.time })
    })

/** 9)  Get input from client - Route parameters */

// route_path: '/user/:userId/book/:bookId'
// actual_request_URL: '/user/546/book/6754'
// req.params: {userId: '546', bookId: '6754'}

app.get('/:word/echo', (req, res) => {
    let obj = { echo: req.params.word }
    res.json(obj)
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

// route_path: '/library'
// actual_request_URL: '/library?userId=546&bookId=6754'
// req.query: {userId: '546', bookId: '6754'}

app.route('/name')
    .get((req, res) => {
        res.json({ name: `${req.query.first} ${req.query.last}` })
    })

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

// Besides GET there is another common http verb, it is POST. POST is the default method 
// used to send client data with HTML forms. In the REST convention POST is used to send data 
// to create new items in the database (a new user, or a new blog post). 
// We don’t have a database in this project, but we are going to learn how to handle POST requests anyway.

// In these kind of requests the data doesn’t appear in the URL, it is hidden in the request body. 
// This is a part of the HTML request, also called payload. 
// Since HTML is text based, even if you don’t see the data, it doesn’t mean that they are secret. 
// The raw content of an HTTP POST request is shown below:

//     POST /path/subpath HTTP/1.0
//     From: john@example.com
//     User-Agent: someBrowser/1.0
//     Content-Type: application/x-www-form-urlencoded
//     Content-Length: 20
//     name=John+Doe&age=25



/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
