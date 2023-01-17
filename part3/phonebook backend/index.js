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
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>
      ${new Date()}`
  )
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

  const generateId = () => {
    
    const randomId = Math.floor(Math.random() * 1000) 
    const exists = persons.find(p => p.id !== randomId)

    if(exists)
    {
        return randomId
    }

    return generateId() 
}

app.post('/api/persons', (request, response) => {
     const body = request.body

    if(body.name === undefined) {
        return response.status(400).json({
            error:'name missing'
        })
    }

    if(body.number === undefined) {
        return response.status(400).json({
            error:'number is missing'
        })
    }

    // if(Person.find({name: {$exists:true}})){
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })    
 })

 app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    
    const person = new Person({
      name: body.name,
      number: body.number
    })

    if(Person.findOne({name: body.name}))
    {
      Person.findByIdAndUpdate(request.params.id, person, {new: true})
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
    }
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
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})