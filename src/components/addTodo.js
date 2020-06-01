import React from 'react';

const AddTodo = ({ e, input, handleChange, addTodo, editMode }) => {
  return (
    <div className="input-group mb-3 todo-add-container">
      <input
        id="input-todo"
        value={input}
        name="input"
        type="text"
        className="form-control"
        placeholder="enter to do"
        onChange={(e) => {
          handleChange(e);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
      />

      <div className="input-group-append">
        <button
          onClick={addTodo}
          className="btn btn-primary"
          type="button"
          id="button-add"
        >
          {typeof editMode !== 'undefined' ? 'Edit todo' : 'Add Todo'}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
