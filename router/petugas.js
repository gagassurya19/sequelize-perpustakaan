const express = require('express')
const app = express()
const md5 = require('md5')

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
        cb(null, "./img/avatar/petugas")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})
// ----------------------------------------------------

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

app.post("/", upload.single("avatar"), async(req, res) => {
    // tampung data
    // ERROR saat terdapat data yang tidak terisi.
    let data = {
        nama_petugas: req.body.nama_petugas,
        jabatan_petugas: req.body.jabatan_petugas,
        no_telp_petugas: req.body.no_telp_petugas,
        alamat_petugas: req.body.alamat_petugas,
        avatar: req.file.filename,
        user: req.body.user,
        password: md5(req.body.password)
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

app.put("/", upload.single("avatar"), async(req, res) => {
    // tampung data
    let data = {
        nama_petugas: req.body.nama_petugas,
        jabatan_petugas: req.body.jabatan_petugas,
        no_telp_petugas: req.body.no_telp_petugas,
        alamat_petugas: req.body.alamat_petugas,
        user: req.body.user,
        password: md5(req.body.password)
    }

    let param = { id_petugas: req.body.id_petugas }

    if(req.file){
        let oldPetugas = await petugas.findOne({ where: param })
        let oldAvatar = oldPetugas.avatar

        // delete oldAvatar
        let pathFile = path.join(__dirname, "../img/avatar/petugas", oldAvatar)
        fs.unlink(pathFile, error => console.log(error))

        data.avatar = req.file.filename // masukin data baru
    }

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

    let oldPetugas = await petugas.findOne({ where: param })
    let oldAvatar = oldPetugas.avatar

    // delete oldAvatar
    let pathFile = path.join(__dirname, "../img/avatar/petugas", oldAvatar)
    fs.unlink(pathFile, error => console.log(error))

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