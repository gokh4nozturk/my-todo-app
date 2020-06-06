import React, { useRef } from "react";

import AddTodo from "./addTodo.js";

const Todo = ({
  title,
  completed,
  deleteTodo,
  addTodo,
  id,
  editTodo,
  toggleCompleted,
  todoCompleted,
  isEdit,
}) => {
  const completedClass = completed ? "todo-p-check" : "";
  return (
    <div className={`card card-main ${isEdit ? "edit" : ""}`}>
      {isEdit ? (
        <AddTodo onClick={addTodo} defaultVal={title} autoFocus />
      ) : (
        <>
          <input
            type="checkBox"
            checked={completed}
            onChange={() => {
              toggleCompleted(id);
            }}
            className={`todo-checkbox`}
          />

          <p
            onClick={() => editTodo(title, id)}
            className={`todo-p ${completedClass}`}
          >
            {title}
          </p>
          <i
            onClick={() => deleteTodo(id)}
            className="far fa-trash-alt todo-trash"
          />
        </>
      )}
    </div>
  );
};
export default Todo;
