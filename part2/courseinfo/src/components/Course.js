const Header = ({course}) => ( 
    <h3 key={course.id}>{course.name}</h3>
  )

const Content = ({course}) => (
  course.parts.map(item => <p key={item.id}>{item.name} {item.exercises}</p>
    )
)

const Total = ({course}) => {
  let sum = course.parts.reduce((prev,current) => prev + current.exercises, 0)

  return (
    <h4>Total of {sum} exercise</h4>
  )
}

const Course = ({course}) => {
  
  return(    
    course.map(item => (
    <div key={item.id}>
      <Header course={item} />
      <Content course={item}/>
      <Total course={item} />
    </div>
    ))
  )
}

export default Course;