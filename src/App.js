import React, { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  // console.log(input);

  const addTodo = () => {
    // console.log(input);
    setTodo([...todo, { input, id: todo.length }]);
    setInput('');
  };

  return (
    <div className="App">
      <div>
        <input
          value={input}
          type="text"
          placeholder="enter todo"
          onChange={(e) => setInput(e.currentTarget.value)} //girdi kontrolü
        />
        <button onClick={addTodo}>ekle</button>
      </div>
      <div className="todo-view">
        {todo.map((addedTodos) => (
          <div>{addedTodos.input}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
