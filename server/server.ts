import express from 'express'
const userRouter = require('./routes/users.routes')
const postRouter = require('./routes/posts.routes')
const app = express();

const PORT = 4000;

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

app.get("/", (_: any, res: any) => res.send("Hello from server!"));

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));