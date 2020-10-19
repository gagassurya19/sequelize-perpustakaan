const express = require('express')
const app = express()

// call model petugas
const petugas = require('../models/index').petugas

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    petugas.findAll() // get all data
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
        nama_petugas: req.body.nama_petugas,
        jabatan_petugas: req.body.jabatan_petugas,
        no_telp_petugas: req.body.no_telp_petugas,
        alamat_petugas: req.body.alamat_petugas
    }

    petugas.create(data)
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
        nama_petugas: req.body.nama_petugas,
        jabatan_petugas: req.body.jabatan_petugas,
        no_telp_petugas: req.body.no_telp_petugas,
        alamat_petugas: req.body.alamat_petugas
    }

    let param = { id_petugas: req.body.id_petugas }

    petugas.update(data,{where : param})
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

app.delete("/:id_petugas", async(req, res) => { 
    let param = { id_petugas: req.params.id_petugas }
    petugas.destroy({where: param})
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