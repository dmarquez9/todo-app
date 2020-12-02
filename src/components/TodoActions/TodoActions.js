import styles from './actions.module.scss'

function TodoActions ({ itemsLeft, onClear, filterButtons, onFilter, filter }) {
  return (
    <div className={styles.actionList}>
      <span>{itemsLeft} items left</span>
      <div className={styles.filters}>
        {filterButtons.map((button, index) => {
          const activeButton = filter === button ? styles.active : ''
          return (
            <button
              key={`${button}-${index}`}
              className={activeButton}
              onClick={() => onFilter(button)}
            >
              {button}
            </button>
          )
        })}
      </div>
      <button onClick={() => onClear()}>
        Clear Completed
      </button>
    </div>
  )
}

export default TodoActions