const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
}

const initialState = {
  data: [{
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
};

function TodoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        data: [
          ...state.data, {
            id: generateKey('todo'),
            text: action.text,
            isCompleted: false
          }
        ]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== action.id)
      };
    case 'COMPLETE_TODO':      
      return {
        ...state,
        data: state.data.map(todo => {
          if (todo.id !== action.id) {
            return todo
          }

          return {...todo, isCompleted: !todo.isCompleted}
        })
      };
    default:
      throw new Error();
  }
}

export { initialState, TodoReducer }