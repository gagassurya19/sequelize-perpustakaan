const express = require('express')
const app = express()

let rak = require('./router/rak')

app.use('/rak', rak)

app.listen(8000, () => {
    console.log(`Running on 8000`)
})