import { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({person, remove, updateNumber}) => (
  <li>
    {person.name} {person.number}
    <Button handleClick={remove}
     text="Delete"></Button>
 </li>
)

const Button = (props) => (
  <button onClick = {props.handleClick}>
        {props.text}
      </button>
)

const Filter = (props) => {
  return(
    <div>
      filter shown with <input value={props.search} onChange={props.handleSearch} />      
    </div>
  )
}

const PersonForm = (props) => {
return(
  <form onSubmit= {props.addPerson}
            >
        <div>
          name: <input value={props.newName} onChange= {props.handleNewName}/> <br />
          number: <input value={props.newNumber} onChange= {props.handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const personToShow = search === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    personService.getAll()
    .then(initialData => {
      setPersons(initialData)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault() 

    if(persons.some(n => (n.name === newName && n.number === newNumber)))
    {
      return alert(newName + " is already added to phonebook")
    }

    if(persons.some(p => (p.name === newName && p.number !== newNumber)))
    {
      const person = persons.find(p => p.name === newName)

      const changedNumber = {...person, number: newNumber}

      if (window.confirm(`Please be aware that the ${newName}'s number will be update to ${newNumber} because this already exists in the phonebook.`)) 
      personService.update(person.id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(p => 
          p.id !== person.id 
          ? p 
          : returnedPerson           
        ))
        setNewName("")
        setNewNumber("")
      });
      return false
    }
     
    const nameObject = {name: newName , number: newNumber}
    
    personService.create(nameObject).then(newPerson =>
      {
        setPersons(persons.concat(newPerson))
        setNewName("")
        setNewNumber("")
        console.log('button clicked', event.target)
      })
  }
  
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Are you sure you want to delete ${person.name}?`))  
    {
      personService.remove(id)
      .then(personService.getAll()
          .then(persons => setPersons(persons))
          ); 
      return false;
    }

  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)

  }
  const handleNewName = (event) =>
  {
      console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNewNumber = (e) => 
  {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }
  return (
    
    <div>
      <h2>Phonebook</h2>

      <Filter search={search} handleSearch={handleSearch} />
      <Button handleClick={() => setSearch("")} text="reset search" />

      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName ={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <ul>
        {
          personToShow.map(person => 
            <Persons key={person.name} person={person} remove={() => deletePerson(person.id)}/>
            )
        }
    </ul>    

    </div>
  )
}

export default App