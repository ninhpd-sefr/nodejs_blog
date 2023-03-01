const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require ('express-handlebars');
const app = express()
const port = 8080

const route = require('./routes')
const db = require('./config/db')

// Connect to db

db.connect()

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
  extended:true
}));
app.use(express.json())

// XMLHttpRequest, fetch, axios


//HTTP logger
app.use(morgan('combined'))

// template engine
app.engine('hbs', engine({
  extname:'.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

//Home, search, contact


// Routes init app
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})