import React from 'react';

const Todo = ({
  title,
  completed,
  deleteTodo,
  id,
  editTodo,
  toggleCompleted,
  todoCompleted,
}) => {
  const completedClass = completed ? 'todo-p-check' : '';
  return (
    <div className="card card-main">
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
    </div>
  );
};
export default Todo;
