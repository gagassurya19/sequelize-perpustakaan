const express = require('express')
const app = express()

// call model anggota
const anggota = require('../models/index').anggota

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    anggota.findAll() // get all data
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
        kode_anggota: req.body.kode_anggota,
        nama_anggota: req.body.nama_anggota,
        jk_anggota: req.body.jk_anggota,
        jurusan_anggota: req.body.jurusan_anggota,
        no_telp_anggota: req.body.no_telp_anggota,
        alamat_anggota: req.body.alamat_anggota
    }

    anggota.create(data)
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
        kode_anggota: req.body.kode_anggota,
        nama_anggota: req.body.nama_anggota,
        jk_anggota: req.body.jk_anggota,
        jurusan_anggota: req.body.jurusan_anggota,
        no_telp_anggota: req.body.no_telp_anggota,
        alamat_anggota: req.body.alamat_anggota
    }

    let param = { id_anggota: req.body.id_anggota }

    anggota.update(data,{where : param})
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

app.delete("/:id_anggota", async(req, res) => { 
    let param = { id_anggota: req.params.id_anggota }
    anggota.destroy({where: param})
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