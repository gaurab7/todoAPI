import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/database.js'

const router = express.Router()

router.post('/register', (req, res) => {
    const { username, password } = req.body
    //encrypts the pw synchronously
    const hashpw = bcrypt.hashSync(password, 8)
    try{
        //prepares a sqlite command with expected input
        const insertUser = db.prepare(`INSERT INTO user(username, password) VALUES(?, ?)`)
        //executes the command
        const result = insertUser.run(username, hashpw)

        //create a token which after it expires the user has to reauthenticate
        //acces to JWT_SERCRETKEY is with us only
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })
    }catch(err)
    {
        console.log(err.message)
        res.sendStatus(503)
    }
})
router.post('/login', (req, res) => {
    const { username, password } = req.body   
    const hashp = bcrypt.hashSync(password, 8)
    try{
        const getuser = db.prepare(`SELECT * FROM user WHERE username = ?`)
        const user = getuser.get(username)

        if(!user){ return res.status(404).send("User not found")}

        const pwcheck = bcrypt.compareSync(password, user.password)
        if(!pwcheck) { return res.status(401).send({ message: "Invalid Password"})}
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)//error at backend
    }
})

export default router
