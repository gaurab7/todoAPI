import express from 'express'

const app = express()

//checks if .env has a PORT defined to use it, if no exist uses 8000
const PORT = process.env.PORT || 8000

//app.get('/', (req, res) => {
 
//})
//starts server & listens for incomming HTTP requests on specified port
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
