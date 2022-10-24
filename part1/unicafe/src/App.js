import { useState } from 'react'

const Button =({handleClicks, text}) => (
      <button onClick={handleClicks}>{text}</button>
)

const Statistics = ({clicks}) => {
  const sum = clicks.good + clicks.bad + clicks.neutral;
  const positive = ((clicks.good/sum) * 100) + '%'
  const average = sum/3

  if (clicks.good === 0 && clicks.neutral
     === 0 && clicks.bad === 0)
     {
      return (<div>No feedback given</div>)
     }

  return (
  <div>
    <StatisticLine text="good" value={clicks.good} />
    <StatisticLine text="neutral" value={clicks.neutral} />
    <StatisticLine text="bad" value={clicks.bad} />
    <StatisticLine text="all" value={sum} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive} />

  </div>
)}
  
const StatisticLine = ({text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr> 
      </tbody>
    </table>
  )
}

const App = () => {

  const [clicks, setClicks] = useState({
    good: 0, 
    bad: 0, 
    neutral: 0
  })

  const handleGoodClicks = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks)
  }

  const handleBadClicks = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClicks)
  }

  const handleNeutralClicks = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks)
  }

  return (
    <div>     
      <h1>give feedback</h1>
      <Button handleClicks={handleGoodClicks} text='good' />
      <Button handleClicks={handleNeutralClicks} text='neutral' />
      <Button handleClicks={handleBadClicks} text='bad' />
      <h1>statistics</h1>
      <Statistics clicks={clicks} />
    </div>
  )
}
export default App;
