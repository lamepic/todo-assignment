import * as actionTypes from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO_ITEM:
      return {
        todos: [...state.todos, action.payload],
      };

    case actionTypes.DELETE_TODO_ITEM:
      const newItems = [...state.todos];
      newItems.splice(action.payload, 1);
      const tmpTodoItems = [state.tmpTodos];
      tmpTodoItems.splice(action.payload, 1);
      return {
        todos: newItems,
        tmpTodos: tmpTodoItems,
      };

    case actionTypes.UPDATE_TODO_ITEM:
      const newTodoItems = [...state.todos];
      const item = newTodoItems[action.payload.index];
      let todosObj = { text: action.payload.text, completed: item.completed };
      newTodoItems.splice(action.payload.index, 1, todosObj);
      return {
        todos: [...newTodoItems],
        // tmpTodoItems: [...newTodoItems],
      };

    case actionTypes.COMPLETE_TODO_ITEM:
      const newTodos = [...state.todos];
      newTodos[action.payload.index].completed = action.payload.completed;
      return {
        todos: [...newTodos],
      };

    case actionTypes.CLEAR_COMPLETED:
      return {
        todos: state.todos.filter((todo) => todo.completed === false),
      };

    case actionTypes.SET_TODO_LIST:
      return {
        todos: action.payload,
      };

    case actionTypes.SET_TMP_TODO_LIST:
      return {
        tmpTodos: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
