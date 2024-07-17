const bodyParser = require("body-parser")
const express = require ("express")
const app = express()
require ("dotenv").config()
const port = process.env.port || 3000
const connectTOMongo = require('./db');
const router = require("./Routes/UserRouter")

connectTOMongo()

app.use(bodyParser.json())
app.use("/user",router)

 app.listen(port,()=>{console.log(`Server started at ${port}`)})