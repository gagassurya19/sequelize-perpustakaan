const express = require('express')
const app = express()

// call model rak
const rak = require('../models/index').rak

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    rak.findAll() // get all data
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", async(req, res) => {
    // tampung data
    let data = {
        nama_rak: req.body.nama_rak,
        lokasi_rak: req.body.lokasi_rak
    }

    rak.create(data)
    .then(result => {
        res.json({
            message: 'Data has been inserted',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async(req, res) => {
    // tampung data
    let data = {
        nama_rak: req.body.nama_rak,
        lokasi_rak: req.body.lokasi_rak
    }

    let param = { id_rak: req.body.id_rak }

    rak.update(data,{where : param})
    .then(result => {
        res.json({
            message: 'Data Updated',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_rak", async(req, res) => { 
    let param = { id_rak: req.params.id_rak }
    rak.destroy({where: param})
    .then(result => {
        res.json({
            message: 'Data destroyed',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app