import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authM  from './middlerware/authM.js'

const app = express()

//checks if .env has a PORT defined to use it, if no exist uses 8000
const PORT = process.env.PORT || 8000

//#region 
//get filename
const fname = fileURLToPath(import.meta.url)
//get directory
const dir = dirname(fname)
// Serve static files from the 'public' folder
app.use(express.static(path.join(dir, '../public')))
//#endregion

//enables to accept json and intepret it
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(dir, '../public', 'login.html'))
})

//ROUTES
app.use('/auth', authRoutes)
app.use('/home', authM, todoRoutes)

//starts server & listens for incomming HTTP requests on specified port
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
