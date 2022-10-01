
const errorHandler = (error,req,res,next) => {
  if(error.name === 'CastError'){
    res.status(400).json(`Wrong ID Format Used. Note Id: ${id} Does Not Exist. `).end() 
  }else if (error.name === 'ValidationError'){
    res.status(400).end(`Error:${error.message}`)
  }

  next(error)
}

module.exports = { errorHandler}