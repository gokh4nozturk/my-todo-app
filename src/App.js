import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./App.css";
import Todo from "./components/todo";
import uniqid from "uniqid";
import AddTodo from "./components/addTodo";

// https://www.themoviedb.org/?language=en-US
// https://www.themoviedb.org/documentation/api?language=en-US
// https://developers.themoviedb.org/3

function App() {
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState();
  const ref = useRef();

  useEffect(() => {
    dataLoad();
  }, []);

  useEffect(() => {
    ref.current.scrollTo({
      top: ref.current.scrollHeight,
    });
  }, [todo]);

  const dataLoad = async () => {
    const data = await Axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    ).then((response) => response.data);
    setTodo(data);
  };
  const addTodo = (value) => {
    if (value !== "") {
      if (typeof editMode !== "undefined") {
        const todos = todo.map((todo) => {
          if (todo.id === editMode) return { ...todo, title: value };
          return todo;
        });
        setTodo(todos);
        setEditMode(undefined);
      } else {
        setTodo([...todo, { title: value, id: uniqid() }]);
      }
    } else {
      alert("doldur");
    }
  };
  const deleteTodo = (id) => {
    const newArray = todo.filter((todos) => todos.id !== id);
    setTodo(newArray);
  };
  const editTodo = (inputEdit, inputId) => {
    setEditMode(inputId);
    alert(`${inputEdit} için düzenleme yapacaksınız!`);
  };
  const toggleCompleted = (id) => {
    const mappedTodo = todo.map((title) => {
      if (title.id === id) return { ...title, completed: !title.completed };
      return title;
    });
    setTodo(mappedTodo);
  };

  return (
    <div className="App">
      <div className="container shadow-sm p-3 mb-5 bg-white rounded">
        <h4 className="app-title">My To Do</h4>
        {/* parça 1 */}
        <div className="grid-part-1">
          <AddTodo onClick={addTodo} />
        </div>

        {/* parça 2 */}
        <div className="grid-part-2 shadow p-3 mb-5 bg-white rounded">
          <div className="todo-container">
            <h5 className="h5">Todos</h5>
            <div className="todo-view" ref={ref}>
              {todo.map((addedTodos) => (
                <Todo
                  key={uniqid()}
                  {...addedTodos}
                  addTodo={addTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleCompleted={toggleCompleted}
                  todoCompleted={false}
                  isEdit={addedTodos.id === editMode}
                />
              ))}
            </div>
            <AddTodo onClick={addTodo} />
          </div>
        </div>

        {/* parça 3 */}
        <div className="grid-part-3 shadow p-3 mb-5 bg-white rounded">
          <div className="todo-container"></div>
          <h5 className="h5">Completed Todos</h5>
        </div>
      </div>
    </div>
  );
}

export default App;
/*

*/
