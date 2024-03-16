require('dotenv').config()

const express = require('express')
const path = require('path')
const routes = require('./routes/routes')
const authRoutes = require('./controllers/googleauth')



const mysql = require('mysql')
// const conn = require('./controllers/db')

const authroutes = require('./controllers/googleauth')
const bodyParser = require('body-parser');

const session = require('express-session')
const passport = require('passport')

const app = express()
const port = process.env.PORT ||  3000


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session()); 

passport.serializeUser(function (user, cb) {
  cb(null, user); // Armazena apenas o ID do usuário na sessão
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
});

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)
app.use('/auth', authRoutes)


app.listen(port, () =>{
	console.log(`Server running on port ${port}`)
})