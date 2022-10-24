import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code a guilccounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  const next = () => (
    setSelected(Math.floor(Math.random() * 7)) 
  )

  const handleVotes = (selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    setVotes(newVotes)
  }

  const mostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1> Anecdote of the day </h1>
      {anecdotes[selected]} has {votes[selected]} votes
      <br />
      <button onClick={()=>handleVotes(selected)}> vote </button>
      <button onClick={next}> next anectode </button>
     
      <h1>Anectode with the most votes</h1>
      {anecdotes[mostVotes]} has {votes[mostVotes]} votes
    </div>
  )
}

export default App;
