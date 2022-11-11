import {useState,useEffect} from 'react'
import axios from 'axios'
import kelvinToCelcius from '../utils/KelvinToCelcius'

const OneCountry = ({country}) => {

  const capitalCity = country.capital
  const languageList = country.languages
 
  const [temp, setTemp] = useState(0)
  const [icon, setIcon] = useState("")
  const [wind, setWind] = useState(0)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`)
  .then( response => {
    console.log(response.data)
    setTemp(Math.round(kelvinToCelcius(response.data.main.temp)))
    setIcon(response.data.weather[0].icon)
    setWind(response.data.wind.speed)
  })}
  )

  console.log(process.env.REACT_APP_API_KEY)
  
  return (
    <div>  
      <h1>{country.name.common}</h1>
      <p>capital: {capitalCity.join(", ")} </p>
      <p>area: {country.area}</p>

      <h3>Languages:</h3>
      <ul> 
        {
          Object.values(languageList).map(language => 
            <li key={country.name.common}>
              {language}
            </li>
          )
        }
      </ul>
      <img src={country.flags.png} alt="country flag"/>
      <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature: {temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"/>
            <p>wind: {wind} m/s</p>
      </div>
    </div>
  )
}

export {OneCountry}