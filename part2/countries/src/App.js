import {useState, useEffect} from 'react'
import axios from 'axios'
import { OneCountry } from './components/OneCountry'

const Country = (props) => {
  const [show, setShow] = useState(false)
  const handleClick = () =>{
    setShow(!show)    
  }

  return (
    <div>
      <p>
        {props.country.name.common}
          
        <button onClick ={handleClick}>{show ? 'hide' : 'show'}</button>
      </p>
        {show && <OneCountry country={props.country}></OneCountry>
        }        
      
    </div>
  )}

const CountryList = (props) => {

  if(props.search=== '')
  {
    return(
      <div> Search country to show</div>
    )
  }

  if(props.showCountries.length > 10)
  {
    return (
    <div>Too many matches, specify another filter</div>  
    )
  }
  
  if (props.showCountries.length === 1)
  {
    return (
      <div>
        <OneCountry country={props.showCountries[0]}></OneCountry>
      </div>
    )
  }
  return (
    <div>
      <ul>
        {
        props.showCountries.map(country => 
          <li key={country.name.official}>
        <Country country={country}></Country>
        </li>
        )
        }
      </ul>
    </div>
  )
 
}
const App =() => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const showCountries = countries.filter(c => c.name.official.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios.get(`https://restcountries.com/v3.1/all`)
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  },[])
  console.log('render', countries.length, 'countries')

  const handleSearch = (event) => {
    const value = event.target.value
    setSearch(value)
  }
 
  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />     
      
      <CountryList search={search} showCountries={showCountries}></CountryList>

    </div>
  )}

export default App;
