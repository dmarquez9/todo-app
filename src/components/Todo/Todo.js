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

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTodo(dragIndex, hoverIndex);
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