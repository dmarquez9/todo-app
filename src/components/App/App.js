import { useReducer } from 'react'
import ThemeToggler from '../ThemeToggler'
import Todo from '../Todo/Todo'
import TodoForm from '../TodoForm'
import styles from './app.module.scss'

import { initialState, TodoReducer } from '../../reducers/todo'

function App() {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.appHeader}>
          <h1>TODO</h1>
          <ThemeToggler />
        </header>
        <TodoForm addTodo={(text) => dispatch({ type: 'ADD_TODO', text })} />
        {state.data?.length ? (
          <>
            <div className={styles.todoBox}>
              {state.data.map((todo) => (
                <Todo
                  key={todo.id}
                  removeTodo={() => dispatch({ type: 'REMOVE_TODO', id: todo.id })}
                  completeTodo={() => dispatch({ type: 'COMPLETE_TODO', id: todo.id })}
                  data={todo}
                />
              ))}
            </div>            
            <span className={styles.dragDrop}>Drag and drop to reorder list</span>
          </>
        ): null}
      </div>
    </div>
  );
}

export default App;
