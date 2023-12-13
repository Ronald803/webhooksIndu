const express = require('express');
const body_parser = require('body-parser');

const app = express().use(body_parser.json())

app.listen(8000,()=>{
    console.log('I am listening on port 8000');
})

app.get('/webhook',(req,res)=>{
    let mode = req.query['hub.mode'];
    let challenge = req.query['hub.challenge'];
    let token = req.query['hub.verify_token'];
    const myToken = "";

    if(mode && token){
        if(mode==="subscribe" && token===myToken){
            res.status(200).send(challenge)
        }else{
            res.status(403)
        }
    }
})