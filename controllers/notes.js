const router = require('express').Router()
const Note = require('../models/note')


router.get('/',(req,res) => {
  Note.find({}).then(notes => res.json(notes))
})

router.get('/:id',(req,res,next) => {
  const id = (req.params.id)
  Note.findById(id).then(note => {
    if(note){
      res.json(note)
    }else{
      res.status(404).end()
    }
  })
  .catch(error =>next(error))
})

router.delete('/:id',(req,res) =>{
  const id = (req.params.id)
  Note.findByIdAndRemove(id).then( result => {
    console.log(`Note deleted`)
    res.status(204).end()
  })
  .catch(error => next(error))
})

router.post('/',(req,res) =>{
  const new_note = req.body

  const note =new Note ({
    content : new_note.content,
    date : new Date(),
    important : true
  })
  
  note.save().then(savedNote => {
    res.json(savedNote)
  })
  .catch(error => next(error))
})

router.get('/admin/info',(req,res) =>{
  Note.find({}).count().then(result => {
    res.json(`There are currently ${result} notes.`)
  })
})

module.exports = router