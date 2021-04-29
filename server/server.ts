import express from 'express';
import userRouter from './routes/users.routes'
import postRouter from './routes/posts.routes'
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'
require('express-async-errors')

const app = express();

const PORT = 5000;

const url = "mongodb://localhost:27017/lab-2";
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
app.use(cookieSession({
    name: 'session', 
    secret: '6krHRZ8P', 
    secure: false, 
    maxAge: 10000 * 60, 
    httpOnly: true 
}));

mongoose.connect(url,  options)
.then((result: any) => app.listen(PORT))
.catch((err: any) => {console.log(err);})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', userRouter)
app.use('/api/posts/', postRouter)
app.use(express.static('../client/public'))
app.get("/", (_: any, res: any) => res.send("Hello from server!"));
