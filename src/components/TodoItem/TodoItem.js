import React, { useState } from "react";
import { EditText } from "react-edit-text";
import { useStateValue } from "../../store/StateProvider";
import * as actionTypes from "../../store/actionTypes";
import "./TodoItem.css";

function TodoItem({ todo, index, setTodolist, todolist }) {
  const [store, dispatch] = useStateValue();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(todo.text);

  const updateTodo = async () => {
    setEdit(false);
    await dispatch({
      type: actionTypes.UPDATE_TODO_ITEM,
      payload: {
        index: index,
        text: text,
      },
    });
    // setTodolist(store.todos);
  };

  const completeTodo = () => {
    dispatch({
      type: actionTypes.COMPLETE_TODO_ITEM,
      payload: {
        index: index,
        completed: !todo.completed,
      },
    });
    setTodolist(store.todos);
  };

  const deleteTodo = () => {
    dispatch({
      type: actionTypes.DELETE_TODO_ITEM,
      payload: index,
    });
    // setTodolist(store.todos);
  };

  return (
    <div className="todoitem">
      <div className="todo__container">
        <span
          className={`todo__check ${edit && "hide"}`}
          onClick={() => {
            completeTodo();
          }}
        >
          {store.todos.filter((item) => item.id === todo.id)[0].completed && (
            <span>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="todo_check"
                fill="#80f580"
              >
                <path d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z"></path>
              </svg>
            </span>
          )}
        </span>
        <div className="todo__text__container">
          <EditText
            name="todo"
            style={{
              fontSize: "26px",
              padding: "13px",
              width: "100%",
              textDecoration: `${todo.completed ? "line-through" : "none"}`,
              color: `${todo.completed ? "#D9D9D9" : "#000"}`,
            }}
            value={text}
            onChange={setText}
            onSave={updateTodo}
            onEditMode={() => {
              setEdit(true);
            }}
          />
        </div>
      </div>
      <span onClick={deleteTodo}>
        <svg
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="94.926px"
          height="94.926px"
          viewBox="0 0 94.926 94.926"
          xmlSpace="preserve"
          className={`todo_delete ${edit && "hide"}`}
          fill="#edc4c4"
        >
          <g>
            <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"></path>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </span>
    </div>
  );
}

export default TodoItem;
