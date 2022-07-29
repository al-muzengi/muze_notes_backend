const express = require('express')
const app = express()
const {notes} = require('./data')

app.use(express.static('./Public'))
app.use(express.json())

app.get('/api/notes/',(req,res) => {
  res.json(notes)
})

app.get('/api/notes/:id',(req,res) => {
  const id = (req.params.id)
  const note = notes.find(note => {
    return note.id == id
  })
  if(note){
    res.json(note)
  }
  else{
    res.status(404).json(`Note Id: ${id} Does Not Exist `)   
  }
})

app.delete('/api/notes/:id',(req,res) =>{
  const id = Number(req.params.id)
  notes = notes.filter((note) => {
    return note.id !== id
  })
  res.status(204).end()
})

app.post('/api/notes',(req,res) =>{
  const new_note = req.body
  
  if(!new_note.content){
    res.status(204).json(`Input field cannot be empty on submission`)
  }

  const note = {
    id : notes.length + 1,
    content : req.body.content ,
    date : new Date().toISOString(),
    important : true
  }
  
  res.json([...notes, note])
})

app.get('/api/info',(req,res) =>{
  const info = {
    length : notes.length,
    date : new Date().toDateString()
  }
  res.send(`<span>There are currently ${info.length} notes as of ${info.date} </span>`)
})

app.listen(5000,() => {
  console.log(`Server listening on PORT 5000`)
})