import Button from "./Button"

const Persons = ({person, remove}) => (
    <li>
      {person.name} {person.number}
      <Button handleClick={remove}
       text="Delete"></Button>
   </li>
  )

  export default Persons