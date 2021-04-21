import express from 'express';
import userRouter from './routes/users.routes'
import postRouter from './routes/posts.routes'
import mongoose from 'mongoose'

const app = express();

const PORT = 4000;

const url = "";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options)
.then((result: any) => app.listen(PORT))
.catch((err: any) => {console.log(err);})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', userRouter)
app.use('/api/posts/', postRouter)

app.get("/", (_: any, res: any) => res.send("Hello from server!"));
