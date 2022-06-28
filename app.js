const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV==="production"){
    app.use(express.static('public'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "public", 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})