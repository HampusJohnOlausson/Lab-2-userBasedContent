const express = require('express');

const app = express();

const PORT = 4000;

app.get("/", (_: any, res: any) => res.send("Hello from server!"));

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));