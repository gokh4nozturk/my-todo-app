import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState([
    { id: 0, input: 'todo 1' },
    { id: 1, input: 'todo 2' },
    { id: 2, input: 'todo 3' },
  ]);
  const [input, setInput] = useState('');
  // console.log(input);

  const addTodo = () => {
    // console.log(input);
    setTodo([...todo, { input, id: todo.length }]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodo([...todo.filter((todos) => todos.id !== id)]);
  };

  return (
    <div className="App container">
      <Navbar></Navbar>
      <div className="row justify-content-center flex-column">
        <div className="add-todo">
          <input
            name="input"
            className="text-center"
            value={input}
            type="text"
            placeholder="enter todo"
            onChange={(e) => setInput(e.currentTarget.value)} //girdi kontrolü
          />
          <button className="btn btn-primary mt-2" onClick={addTodo}>
            ekle
          </button>
        </div>

        <div className="todo-view">
          {todo.map((addedTodos) => (
            <div className="card">
              <div className="card-header">Todo {addedTodos.id + 1}</div>
              <div className="card-body">
                <p>{addedTodos.input}</p>
                <i
                  onClick={() => deleteTodo(addedTodos.id)}
                  className="far fa-trash-alt"
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
