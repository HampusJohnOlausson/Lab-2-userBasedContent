import express, { request } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const User = require('../models/user.model')
interface user {
    name: string, 
    age: number, 
    password: string
}

const userRouter = express.Router()


userRouter.get('/', (req, res) => {
    res.send('Get anrop')
})

userRouter.post('/register', async (req, res) => {
    const { userName, passWord } = req.body
    const existingUsers = await User.find({userName})
    for(let i = 0; i < existingUsers.length; i++ ) {
        if(existingUsers[i].userName === req.body.userName){
            return res.status(400).json('Username already exists')
        }
    }

    const hashedPassword = await bcrypt.hash(passWord, 10)

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userName: userName, 
        passWord: hashedPassword, 
        role: 'user'
    })

    await newUser.save()
    res.status(201).json(newUser)
})

userRouter.post('/login', async (req, res) => {
    const { userName, passWord} = req.body
    const existingUsers = await User.find({userName})
    const user = existingUsers.find((u: any) => u.userName === userName)
    if(!user || !await bcrypt.compare(passWord, user.passWord)){
        return res.status(401).json('Incorrect password or username')
    }
    if(req.session) {
        req.session.username = userName
        req.session.id = user._id
        req.session.role = user.role
        res.status(200).json(null)
    }
})

userRouter.get('/allUsers', secureWithRole('admin'), async (req: any, res: any) =>{
    const result = await User.find()
    res.status(200).json(result)
})



userRouter.delete('/logOut', (req, res) => {
    if(req.session){
        if(!req.session.username) {
            return res.status(400).json('cant sign out')
        }
    }
    
    req.session = null
    res.status(200).json('You are now signed out')
})

function secure(req: any, res: any, next: any) {
    if(req.session.username) {
        next()
    }else {
        res.status(401).json('you need to sign in to access this')
    }
}

function secureWithRole(role: string) {
    return [secure, async (req: any, res: any, next: any) => {
        if(req.session.role === role){
            next()
        }else {
            res.status(403).json('You dont have authority to see this info')
        }
    }]
}

export default userRouter;