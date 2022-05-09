import { useState } from "react";
import "./App.css";
import { useStateValue } from "./store/StateProvider";
import * as actionTypes from "./store/actionTypes";
import TodoItem from "./components/TodoItem/TodoItem";

function App() {
  const [store, dispatch] = useStateValue();
  const [text, setText] = useState("");
  const [todolist, setTodolist] = useState([]);

  const handleTodo = (e) => {
    e.preventDefault();
    const todo = {
      id: new Date(),
      text: text,
      completed: false,
    };
    setTodolist([...todolist, todo]);
    dispatch({
      type: actionTypes.ADD_TODO_ITEM,
      payload: todo,
    });
    setText("");
  };

  const handleTab = (tab) => {
    switch (tab) {
      case "completed":
        dispatch({
          type: actionTypes.SET_TODO_LIST,
          payload: todolist.filter((todo) => todo.completed === true),
        });
        break;
      case "active":
        dispatch({
          type: actionTypes.SET_TODO_LIST,
          payload: todolist.filter((todo) => todo.completed === false),
        });
        break;
      case "all":
        dispatch({
          type: actionTypes.SET_TODO_LIST,
          payload: todolist,
        });
        break;
      default:
        break;
    }
  };

  const handleClearCompleted = () => {
    const new_todo = store.todos.filter((todo) => todo.completed === false);
    setTodolist(new_todo);
    dispatch({
      type: actionTypes.CLEAR_COMPLETED,
    });
  };

  return (
    <div className="app">
      <h1 className="header">todos</h1>

      <main>
        <div className="input__container">
          <form onSubmit={handleTodo}>
            <input
              type="text"
              placeholder="what needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="main__input"
            />
          </form>
        </div>

        <div className="todos__items">
          {store.todos.map((todo, idx) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={idx}
                setTodolist={setTodolist}
                todolist={setTodolist}
              />
            );
          })}
        </div>
      </main>
      {todolist.length > 0 && (
        <div className="footer">
          <div className="task__count">{todolist.length} item(s) left</div>
          <div className="tabs">
            <p className="tab" onClick={() => handleTab("all")}>
              All
            </p>
            <p className="tab" onClick={() => handleTab("active")}>
              Active
            </p>
            <p className="tab" onClick={() => handleTab("completed")}>
              Completed
            </p>
          </div>
          <div
            className="clear__completed"
            onClick={() => handleClearCompleted()}
          >
            {" "}
            Clear Completed
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
