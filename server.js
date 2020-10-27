const express = require('express')
const app = express()

let auth = require('./router/auth')
let rak = require('./router/rak')
let buku = require('./router/buku')
let anggota = require('./router/anggota')
let petugas = require('./router/petugas')
let peminjaman = require('./router/peminjaman')
let pengembalian = require('./router/pengembalian')

app.use('/auth', auth)
app.use('/rak', rak)
app.use('/buku', buku)
app.use('/anggota', anggota)
app.use('/petugas', petugas)
app.use('/peminjaman', peminjaman)
app.use('/pengembalian', pengembalian)

app.listen(8000, () => {
    console.log(`Running on 8000`)
})