import express from 'express'
import db from '../config/database.js'

const router = express.Router()
 
//gets todo data for logged user
router.get('/todos', (req, res) =>{
    const tasks = db.prepare(`SELECT * FROM todos WHERE userid = ?`)
    //.get returns the first element only, .all returns all elements of the array
    //here the midleware authenticates the user and provides the req
    const taskslist = tasks.all(req.userid)
    res.json(taskslist)
   
})
//create new tasks
router.post('/todos', (req, res) =>{
    const { userid, task } = req.body
    const newtask = db.prepare(`INSERT INTO todos( userid, task) VALUES( ?, ?)`)
    const taskAdded = newtask.run(userid, task)
})
//update task
//'/:id' to specify which task to update 
router.put('/:id', (req, res) => {

})
//delete task
router.delete('/:id', (req, res) => {

})

export default router