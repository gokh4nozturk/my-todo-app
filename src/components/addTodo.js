import React, { useState } from "react";

const AddTodo = ({ autoFocus = false, defaultVal = "", editMode, onClick }) => {
  const [val, setVal] = useState(defaultVal);
  return (
    <div className="input-group mb-3 todo-add-container">
      <input
        autoFocus={autoFocus}
        value={val}
        type="text"
        className="form-control"
        placeholder="enter to do"
        onChange={(e) => {
          setVal(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClick(val);
          }
        }}
      />

      <div className="input-group-append">
        <button
          onClick={() => onClick(val)}
          className="btn btn-primary"
          type="button"
          id="button-add"
        >
          {typeof editMode !== "undefined" ? "Edit todo" : "Add Todo"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
