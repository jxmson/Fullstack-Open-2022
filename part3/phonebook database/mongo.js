const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackphonebook:${password}@cluster0.isj6pzo.mongodb.net/phonebook?retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

// const findAll = ()=> {

//   Person.find({}).then(result => {
//     console.log("phonebook:")
//     result.forEach(person => {
//         console.log(person.name, person.number)
//     })
//   })
// } 

mongoose.set('strictQuery',true);

const person = new Person({
  name: name,
  number: number,
})

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
   
    if (process.argv.length == 3)
    {     
      return Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)
        })
      })
          
    }
    else
    {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      return person.save()
    }
  })
  .then(() => {   
    return mongoose.connection.close()
  })
  .catch((err) => {
    console.log(err)
  })

