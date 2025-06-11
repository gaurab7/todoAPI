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
    const { task } = req.body
    const newtask = db.prepare(`INSERT INTO todos( userid, task) VALUES( ?, ?)`)
    //rather than using { userid, task} = req.body we can get userid from the request itself
    const taskAdded = newtask.run(req.userid, task)
  
    res.json({ id: taskAdded.lastInsertRowid, task, completed: 0 })
})
//update task
//'/:id' to specify which task to update 
router.put('/todos/:id', (req, res) => {

    const { state } = req.body
    //params--> '/:id' here id is the param(after :)
    //for queries--> '/:id?q="fksj"' here fksj is the query and we use req.query for that
    const { id } = req.params 
    const update = db.prepare('UPDATE todos SET state = ? WHERE id = ?')
    update.run(state, id)
    res.json({ message: "Todo completed" })

})
//delete task
router.delete('/todos/:id', (req, res) => {
     const { id } = req.params
     const userId = req.userid
     const del = db.prepare(`DELETE FROM todos WHERE id = ? AND userid = ?`)
     //filtering by id and userid so that a user doesnt delete others tasks
     del.run(id, userId)
     res.json({msg: "Todo Deleted"})
})

export default router