import express from 'express'
import cors from 'cors'
import session from 'express-session'
import books from './controller/books.js' 
import users from './controller/users.js' 

const app = express()

//CORS blokavimo nuėmimas 
app.use(cors())

//Duomenų priėmimui JSON formatu
app.use(express.json())

app.use('/uploads', express.static('uploads'))

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({extended: true}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'labai slapta fraze',
  resave: false,
  saveUninitialized: false,
  cookie: {
     secure: false,
     maxAge: 6000000
    }
}))

//Priskiriame posts kontrolerį
app.use('/api/books/', books)

//Priskiriame users kontrolerį
app.use('/api/users/', users)

//Paleidžiame serverį
app.listen(3000)