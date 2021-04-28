import express, { Request, request, Response } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const User = require('../models/user.model')
require('express-async-errors')
interface user {
    name: string, 
    age: number, 
    password: string
}

const userRouter = express.Router()


userRouter.get('/loggedIn', (req, res) => {
    if(req.session) {
        res.status(200).send(req.session.username)
    }else {
        res.status(401).json('No one is logged in')
    }
})

userRouter.delete('/deleteUser/:id', async (req, res) => {
   const id = req.params.id
   User.deleteOne({ _id: id}, function(err: Error) {
    if(err){
        return(err)   
    }
    res.json('deleted') 
   })

})

userRouter.get('/loggedIn/role', (req, res) => {
    if(req.session) {
        res.status(200).send(req.session.role)
    }else {
        res.status(200).send('No one is logged in')
    }
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

    if(passWord !== req.body.rePassword) {
        return res.status(406).json('Passwords doesnt match')
    }
    
    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userName: userName, 
        passWord: hashedPassword, 
        role: 'admin',
    })

    await newUser.save()
    res.status(201).json(newUser)
})

userRouter.post('/login', async (req, res: any) => {
    const { userName, passWord} = req.body
    const existingUsers = await User.find({userName}).select('+passWord')
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

userRouter.get('/allUsers', secureWithRole('admin'), async (req: Request, res: Response) => {
    const result = await User.find()
    res.status(200).json(result)
})

userRouter.put('/changeRole/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    const changedUser = await User.findByIdAndUpdate(id, {role: req.body.role})
    res.status(200).json(changedUser)
})

userRouter.delete('/logOut', (req, res) => {
    if(req.session){
        if(!req.session.username) {
            return res.status(400).json('Cant sign out')
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