import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'
import { registerValidator, loginValidator } from '../middleware/validate.js'

const router = express.Router()

router.post('/register', registerValidator, async (req, res) => {
    try {
        const userExists = await db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        })
        
        if(userExists) {
            res.status(401).send('This user already exists')
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)

        await db.Users.create(req.body)
        res.send('New user has been successfully created')

    } catch(error) {

        console.log(error)
        res.status(418).send('Server error')
    }
})

router.post('/login', loginValidator, async (req, res) => {
    try {
        const user = await db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        })
        
        if(!user) 
            return res.status(401).send('User not found')

        if(await bcrypt.compare(req.body.password, user.password)) {
            req.session.loggedin = true
            res.send('Login successful')
        } else {
            res.status(401).send('Login failed')
        }
    } catch(error) {
        console.log(error)
        res.status(418).send('Server error')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('You just have been logged out')
})

export default router