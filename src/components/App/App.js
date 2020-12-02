import { useReducer, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import ThemeToggler from '../ThemeToggler'
import Todo from '../Todo/Todo'
import TodoForm from '../TodoForm'
import styles from './app.module.scss'

import { initialState, TodoReducer } from '../../reducers/todo'

function App() {
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const moveTodo = useCallback((dragIndex, hoverIndex) => {
    const todo = state[dragIndex]
    dispatch({ type: 'MOVE_TODO', todo, dragIndex, hoverIndex })
  }, [state]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.appHeader}>
          <h1>TODO</h1>
          <ThemeToggler />
        </header>
        <TodoForm addTodo={(text) => dispatch({ type: 'ADD_TODO', text })} />
        {state?.length ? (
          <>
            <div className={styles.todoBox}>
              <DndProvider backend={HTML5Backend}>
                {state.map((todo, index) => (
                  <Todo
                    key={todo.id}
                    removeTodo={() => dispatch({ type: 'REMOVE_TODO', id: todo.id })}
                    completeTodo={() => dispatch({ type: 'COMPLETE_TODO', id: todo.id })}
                    moveTodo={moveTodo}
                    data={todo}
                    index={index}
                  />
                ))}
              </DndProvider>
            </div>            
            <span className={styles.dragDrop}>Drag and drop to reorder list</span>
          </>
        ): null}
      </div>
    </div>
  );
}

export default App;
