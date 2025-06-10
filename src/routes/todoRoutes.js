import express from 'express'
import db from '../config/database.js'

const router = express.Router()
 
//gets todo data for logged user
router.get('/', (req, res) =>{

})
//create new tasks
router.post('/', (req, res) =>{

})
//update task
//'/:id' to specify which task to update 
router.put('/:id', (req, res) => {

})
//delete task
router.delete('/:id', (req, res) => {

})

export default router