import express from 'express'
import { engine } from 'express-handlebars'
import mysql from 'mysql2/promise'


const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: true}))

const database = await mysql.createConnection({
    host: 'pauliuspetrunin.lt',
    user: 'bit',
    password: 'kulokas',
    database: 'aurimasp'
})

const port = process.env.port || 3000

app.get('/', async (req, res) => {
    const songs = await database.query('SELECT id, song_Name, song_Album FROM songs')
    res.render('index', {songs: songs[0]})
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const deleteSong = 'DELETE FROM songs WHERE id = ?';
    await database.query(deleteSong, [id]);
  res.redirect('/');
})

app.get('/new', (req, res) => {
    res.render('new')

})
app.post('/new', async (req, res) => {
    let name = req.body.song_Name;
    let album = req.body.album_Name;

    const song = `INSERT INTO songs (song_Name, song_Album)
    VALUES ('${name}','${album}')`;
    await database.query(song)
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    const id = req.params.id
    const songs = await database.query('SELECT id, song_Name, song_Album FROM songs')
    res.render('edit') 
})

app.post('/edit/:id', async (req, res) => {
    const id = req.params.id
    let name = req.body.song_Name
    let album = req.body.album_Name
 await database.query(`UPDATE songs SET song_Name = '${name}', song_Album = '${album}' WHERE id = ${id}`)
 res.redirect('/')
})

app.get('/playlists', (req, res) => {
    res.render("playlists")
})

app.listen(port)