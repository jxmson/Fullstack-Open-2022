import axios from 'axios'
import { useState, useEffect } from 'react'

const Persons = ({person}) => (
  <li>{person.name} {person.number}</li>
)

const AllPersons = (props) => (
    <ul>
        {
          props.ToShow.map(person => 
            <Persons key={person.name} person={person}/>
            )
        }
    </ul>
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

  const personToShow = search === '' ? persons : persons.filter(person => person.name.includes(search))

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(name => name.name === newName))
    {
      return alert(newName + " is already added to phonebook")
    }
    const nameObject = {name: newName , number: newNumber}
    
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
    console.log('button clicked', event.target)
  }

  const handleSearch = (event) =>{
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
      <div>debug: {newName}</div>

      <h2>Phonebook</h2>

      <Filter search={search} handleSearch={handleSearch} />
      <Button handleClick={() => setSearch("")} text="reset search" />

      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName ={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <AllPersons ToShow={personToShow}/>     

    </div>
  )
}

export default App