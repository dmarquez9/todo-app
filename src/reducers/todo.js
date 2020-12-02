const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
}

const initialState = [{
  id: '1',
  text: "Tarea uno",
  isCompleted: true
}, {
  id: '2',
  text: "Tarea dos",
  isCompleted: false
}, {
  id: '3',
  text: "Tarea tres",
  isCompleted: false
}]

function TodoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: generateKey('todo'),
          text: action.text,
          isCompleted: false
        }
      ];

    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);

    case 'COMPLETE_TODO':      
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo
        }

        return {...todo, isCompleted: !todo.isCompleted}
      });

    case 'CLEAR_COMPLETED':
      return state.filter(todo => todo.isCompleted === false);

    case 'MOVE_TODO': {
      const data = [...state]

      if (action.hoverIndex >= data.length) {
        let k = action.hoverIndex - data.length + 1;
        while (k--) {
          data.push(undefined);
        }
      }

      data.splice(action.hoverIndex, 0, data.splice(action.dragIndex, 1)[0]);

      return data;
    }

    default:
      throw new Error();
  }
}

export { initialState, TodoReducer }