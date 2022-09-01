import express from 'express'
import { Op } from 'sequelize'
import db from '../database/connect.js'
import { auth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { postValidator } from '../middleware/validate.js'
import { bookValidator } from '../middleware/validate.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const options = {}

    if(req.query.order)
        options.order = [ 'title', 'DESC']

    try {
        const books = await db.Books.findAll(options)
        res.json(books)
    } catch {
        res.status(500).json({message: 'Server error'})
    }
})




router.get('/:id', async (req, res) => {
    try {
    const book = await db.Books.findByPk(req.params.id)
    res.json(book)
} catch {
    res.status(500).send('Server error')
}
})

router.get('/search/:keyword', async (req, res) => {
    try {
        const books = await db.Books.findAll({
            where: {
                title: {
                    [Op.like]: '%' + req.params.keyword + '%'
                }
            }
        })
        res.json(books)
    } catch {
        res.status(500).send('Server error')
    }
})


router.post('/', auth, upload.single('image'), bookValidator, async (req, res) => {
    try {
        if(req.file)
            req.body.image = '/uploads/' + req.file.filename
            
        new db.Books(req.body).save()
        res.send('Book has been successfully uploaded')
    } catch {
        res.status(500).send('Server error')
    }
})

router.put('/edit/:id', auth, upload.single('image'), postValidator, async (req, res) => {
    try {
        const book = await db.Books.findByPk(req.params.id)
        book.update(req.body)
        res.send('Book has been successfully updated')
    } catch {
        res.status(500).send('Server error')
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
try {
    const book = await db.Books.findByPk(req.params.id)
    book.destroy()
    res.json({ message: 'Book has been successfully deleted' })
} catch {
    res.status(500).send('Server error')
}
})


export default router