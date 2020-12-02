import cx from 'classnames'
import Checkbox from '../Checkbox'
import styles from './todo.module.scss'

import { ReactComponent as CloseIcon } from '../../assets/icon-cross.svg'

function Todo ({ data, removeTodo, completeTodo }) {
  const completedClass = data.isCompleted ? styles.completedTodo : ''

  return (
    <div className={cx(styles.todo, completedClass)}>
      <Checkbox
        value={data.isCompleted}
        onChange={() => completeTodo(data.id)}
      />
      <span className={styles.text}>{data.text}</span>
      <button
        onClick={() => removeTodo(data.id)}
        className={styles.btnClose}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default Todo