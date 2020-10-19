const express = require('express')
const app = express()

// call model peminjaman
const peminjaman = require('../models/index').peminjaman
const buku = require('../models/index').buku

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    peminjaman.findAll({
        include: ['buku', 'anggota', 'petugas']
    }) // get all data
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
        tanggal_pinjam: req.body.tanggal_pinjam,
        tanggal_kembali: req.body.tanggal_kembali,
        id_buku: req.body.id_buku,
        id_anggota: req.body.id_anggota,
        id_petugas: req.body.id_petugas
    }
    peminjaman.create(data)

    // kurangi data peminjaman
    const a = await buku.findOne({where: { id_buku: data.id_buku }})
    let stokk = {
        stok: a.stok - 1
    }
    buku.update(stokk, { where: { id_buku: data.id_buku}})

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
        tanggal_pinjam: req.body.tanggal_pinjam,
        tanggal_kembali: req.body.tanggal_kembali,
        id_buku: req.body.id_buku,
        id_anggota: req.body.id_anggota,
        id_petugas: req.body.id_petugas
    }

    let param = { id_peminjaman: req.body.id_peminjaman }

    peminjaman.update(data,{where : param})
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

app.delete("/:id_peminjaman", async(req, res) => { 
    let param = { id_peminjaman: req.params.id_peminjaman }    
    try{
        // tambah data peminjaman
        let b = await peminjaman.findOne({ where: param })
        let a = await buku.findOne({ where: { id_buku: b.id_buku } })
        let stokk = {
            stok: a.stok + 1
        }
        buku.update(stokk, { where: { id_buku: b.id_buku}})

        peminjaman.destroy({where: param})
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
    }catch(error){
        res.json({
            message: error.message
        })
    }
})
module.exports = app