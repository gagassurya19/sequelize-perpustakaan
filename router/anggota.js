const express = require('express')
const app = express()
const md5 = require('md5') //hashing md5

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
        cb(null, "./img/avatar/anggota")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})
// ----------------------------------------------------

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

app.post("/", upload.single("avatar"), async(req, res) => {
    // tampung data
    let data = {
        kode_anggota: req.body.kode_anggota,
        nama_anggota: req.body.nama_anggota,
        jk_anggota: req.body.jk_anggota,
        jurusan_anggota: req.body.jurusan_anggota,
        no_telp_anggota: req.body.no_telp_anggota,
        alamat_anggota: req.body.alamat_anggota,
        avatar: req.file.filename,
        user: req.body.user,
        password: md5(req.body.password)
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

app.put("/", upload.single("avatar"), async(req, res) => {
    // tampung data
    let data = {
        kode_anggota: req.body.kode_anggota,
        nama_anggota: req.body.nama_anggota,
        jk_anggota: req.body.jk_anggota,
        jurusan_anggota: req.body.jurusan_anggota,
        no_telp_anggota: req.body.no_telp_anggota,
        alamat_anggota: req.body.alamat_anggota,
        user: req.body.user,
        password: md5(req.body.password)
    }

    let param = { id_anggota: req.body.id_anggota }

    if(req.file){
        let oldAnggota = await anggota.findOne({ where: param })
        let oldAvatar = oldAnggota.avatar

        // delete oldAvatar
        let pathFile = path.join(__dirname, "../img/avatar/anggota", oldAvatar)
        fs.unlink(pathFile, error => console.log(error))

        data.avatar = req.file.filename // masukin data baru
    }

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

    let oldAnggota = await anggota.findOne({ where: param })
    let oldAvatar = oldAnggota.avatar

    // delete oldCover
    let pathFile = path.join(__dirname, "../img/avatar/anggota", oldAvatar)
    fs.unlink(pathFile, error => console.log(error))

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