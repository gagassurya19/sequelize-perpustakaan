const express = require('express')
const app = express()

// call library multer
// ----------------------------------------------------
const multer = require("multer")
// digunakan untuk membaca data request dari form-data
const path = require("path")
// digunakan untuk mengatur direktori file
const fs = require("fs")
const { error } = require('console')
// digunakan untuk mengatur file

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./img/cover")
    },
    filename: (req, file, cb) => {
        cb(null, "cover-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})
// ----------------------------------------------------

// call model buku
const buku = require('../models/index').buku

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

// auth
const verifyToken = require('./tokenVerify')
app.use(verifyToken) // memberikan token kesemua endpoint

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

app.post("/", upload.single("cover"), async(req, res) => {
    // tampung data
    let data = {
        id_rak: req.body.id_rak,
        judul_buku: req.body.judul_buku,
        penulis_buku: req.body.penulis_buku,
        penerbit_buku: req.body.penerbit_buku,
        tahun_penerbit: req.body.tahun_penerbit,
        stok: req.body.stok,
        cover: req.file.filename
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

app.put("/", upload.single("cover"), async(req, res) => {
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

    if(req.file){
        let oldBuku = await buku.findOne({ where: param })
        let oldCover = oldBuku.cover

        // delete oldCover
        let pathFile = path.join(__dirname, "../img/cover", oldCover)
        fs.unlink(pathFile, error => console.log(error))

        data.cover = req.file.filename // masukin data baru
    }

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

    // ambil data yg akan dihapus
    let oldBuku = await buku.findOne({where: param})
    let oldCover = oldBuku.cover

    let pathFile = path.join(__dirname, "../img/cover", oldCover)
    fs.unlink(pathFile, error => console.log(error))

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