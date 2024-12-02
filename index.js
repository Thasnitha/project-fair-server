//loads .env file contents into proccess.env by default.
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./config/connection')

const pfServer =express()

pfServer.use(cors())

pfServer.use(express.json()) // so it becomes object
// after json parsing   only use router
pfServer.use(router)

const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`project fair server started at PORT :${PORT} and waiting for client request!!!`);
    
})

//http://localhost:3000/-get
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">project fair server started and waiting for client request!!!  </h1>`)   //send or json,for browser output=send


})
