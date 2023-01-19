require('dotenv').config()
const express = require('express') 
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/people')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :content'))

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
  })

  app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}`)
  })
  })   

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(note => {
      response.json(note)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
          .then(result => {
            response.status(204).end()
          })
          .catch(error => next(error))
  })

//   const generateId = () => {
    
//     const randomId = Math.floor(Math.random() * 1000) 
//     const exists = persons.find(p => p.id !== randomId)

//     if(exists)
//     {
//         return randomId
//     }

//     return generateId() 
// }

 app.put('/api/persons', (request, response, next) => {
    const body = request.body
    
    const person = new Person({
      name: body.name,
      number: body.number
    })

      Person.updateOne({name: body.name}, {name: body.name, number: body.number}, {upsert: true, runValidators: true, context:'query'})
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
    })
 
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
      name: body.name,
      number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })   
  .catch(error => next(error)) 
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({
      error: 'malformatted id'
    })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})