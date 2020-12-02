import { useRef } from 'react'
import cx from 'classnames'
import { useDrag, useDrop } from 'react-dnd';

import Checkbox from '../Checkbox'
import styles from './todo.module.scss'

import { ReactComponent as CloseIcon } from '../../assets/icon-cross.svg'

function Todo ({ data, removeTodo, completeTodo, moveTodo, index }) {
  const completedClass = data.isCompleted ? styles.completedTodo : ''
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'TODO',
    hover(item, monitor) {
      if (!ref.current) {
          return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      // Time to actually perform the action
      moveTodo(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'TODO', id: data.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={cx(styles.todo, completedClass)}
    >
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