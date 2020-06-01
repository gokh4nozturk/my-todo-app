import React from 'react';

const CompletedTodo = ({
  title,
  completed,
  deleteTodo,
  id,
  editTodo,
  toggleCompleted,
}) => {
  const completedClass = completed ? 'todo-p-check' : '';
  const completedTodos = completed && title;
  return (
    <div className="card card-main">
      <p
        onClick={() => editTodo(title, id)}
        className={`todo-p ${completedClass}`}
      >
        {completedTodos}
      </p>
      <i
        onClick={() => deleteTodo(id)}
        className="far fa-trash-alt todo-trash"
      />
    </div>
  );
};
export default CompletedTodo;
