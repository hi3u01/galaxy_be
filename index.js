const express = require('express');
const characterRouter = require('./routes/characters')

const app = express();
const port = 3000;

app.use('/characters', characterRouter)

app.listen(port, () =>{
    console.log(`[SERVER] is running on port ${port}`)
})