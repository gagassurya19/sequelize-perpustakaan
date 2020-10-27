const { urlencoded } = require('express')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const md5 = require('md5')

// panggil module
const petugas = require('../models/index').petugas
const anggota = require('../models/index').anggota
app.use(express.urlencoded({extended: true}))

// params 'usr' for management user auth
app.post("/:usr/:exp", async (req,res) => {
    let param = {
        user: req.body.user,
        password: md5(req.body.password)
    }

    let user = req.params.usr;
    let result = null;
    if(user === "petugas"){
        result = await petugas.findOne({where: param})
    } else if(user === "anggota"){
        result = await anggota.findOne({where: param})
    }

    if(result === null){
        res.json({
            message: "Invalid Username or Password"
        })
    }else {
        // set jwt.sign
        let jwtHeader = {
            algorithm: 'HS256',
            expiresIn: req.params.exp
        }
        let payload = {data: result}
        let secretKey = 'SequelizePerpus'
        
        // generate token jwt | Payload | secretKey | header
        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
})

module.exports = app