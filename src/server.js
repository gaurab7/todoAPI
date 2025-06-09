import express from 'express'

const app = express()

//checks if .env has a PORT defined to use it, if no exist uses 8000
const PORT = process.env.PORT || 8000

//user json
const users = [
  { id: 1, username: '', passwordHash: '' } 
];
const todos = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Walk the dog', completed: true }
  ];

//enables to accept json and intepret it
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/login');
});
app.get('/login', (req, res) => {
 
})



app.post('/login', (req, res) => {

  const {un, pw} = req.body
  res.send(`${un}, ${pw}`)
})

//starts server & listens for incomming HTTP requests on specified port
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})
