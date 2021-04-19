import express, { request } from 'express'
import cookieSession from 'cookie-session'
import bcrypt from 'bcrypt'
import { log } from 'node:console'

interface user {
    name: string, 
    age: number, 
    password: string
}
const users: any = []

const router = express.Router()

router.use(cookieSession({
    name: 'session', 
    secret: '6krHRZ8P', 
    secure: false, 
    maxAge: 10000 * 60, 
    httpOnly: true 
}))

router.get('/', (req, res) => {
    res.send('Get anrop')
})

router.post('/register', async (req, res) => {
    const { name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
        name,
        password: hashedPassword
    }
    users.push(user)
    res.status(201).json(user)
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    const { name, password} = req.body
    const user = users.find((u:user) => u.name === name)

    if(!user || !await bcrypt.compare(password, user.password)){
        res.status(401).json("Incorrect password or username")
        return
    }

    if(req.session !== undefined && req.session !== null){
        req.session.username = user.name
        res.status(201).json(user)
        return
    }
})

router.get('/allUsers', (req, res) => {
    res.json(users)
})

export default router;