import { useState } from 'react'
import Checkbox from '../Checkbox'
import styles from './form.module.css'

function TodoForm ({ addTodo }) {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit}>
      <Checkbox />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Create a new todo..."
      />
    </form>
  )
}

export default TodoForm