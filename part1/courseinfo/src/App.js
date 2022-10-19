

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {

    return props.course.parts.map(item => (<p>{item.name} {item.exercises}</p>));
  
}

const Total = (props) => {

  let sum = props.course.parts.reduce(function(prev,current){
    return prev + current.exercises
  }, 0);

  return (
      <p>Total number of exercises is {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
  <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
  </div>
  )
}

export default App
