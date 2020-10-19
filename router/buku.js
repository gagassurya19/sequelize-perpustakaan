const express = require('express')
const app = express()

// call model buku
const buku = require('../models/index').buku

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    buku.findAll({
        include: ['rak'] // add table where there is foreignkey in the table
    })
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
        id_rak: req.body.id_rak,
        judul_buku: req.body.judul_buku,
        penulis_buku: req.body.penulis_buku,
        penerbit_buku: req.body.penerbit_buku,
        tahun_penerbit: req.body.tahun_penerbit,
        stok: req.body.stok
    }

    buku.create(data)
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
        id_rak: req.body.id_rak,
        judul_buku: req.body.judul_buku,
        penulis_buku: req.body.penulis_buku,
        penerbit_buku: req.body.penerbit_buku,
        tahun_penerbit: req.body.tahun_penerbit,
        stok: req.body.stok
    }

    let param = { id_buku: req.body.id_buku }

    buku.update(data,{where : param})
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

app.delete("/:id_buku", async(req, res) => { 
    let param = { id_buku: req.params.id_buku }
    buku.destroy({where: param})
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