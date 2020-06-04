import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import './App.css';
import Todo from './components/todo';
import uniqid from 'uniqid';
import AddTodo from './components/addTodo';

function App() {
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(undefined);
  const [input, setInput] = useState('');
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
      'https://jsonplaceholder.typicode.com/todos'
    ).then((response) => response.data);
    setTodo(data);
  };
  const addTodo = () => {
    if (input !== '' || input !== '') {
      if (typeof editMode !== 'undefined') {
        const todos = todo.map((todo) => {
          if (todo.id === editMode) return { ...todo, title: input };
          return todo;
        });
        setTodo(todos);
        setEditMode(undefined);
      } else {
        setTodo([...todo, { title: input, id: uniqid() }]);
      }
      setInput('');
    } else {
      alert('doldur');
    }
  };

  const deleteTodo = (id) => {
    const newArray = todo.filter((todos) => todos.id !== id);
    setTodo(newArray);
  };
  const editTodo = (inputEdit, inputId) => {
    setEditMode(inputId);
    alert(`${inputEdit} için düzenleme yapacaksınız!`);
    setInput(inputEdit);
  };
  const toggleCompleted = (id) => {
    const editTodo = todo.map((title) => {
      if (title.id === id) return { ...title, completed: !title.completed };
      return title;
    });
    setTodo(editTodo);
  };

  const handleChange = (e) => {
    setInput(e.currentTarget.value);
  };

  return (
    <div className="App">
      <div className="container shadow-sm p-3 mb-5 bg-white rounded">
        <h4 className="app-title">My To Do</h4>
        {/* parça 1 */}
        <div className="grid-part-1">
          <AddTodo
            input={input}
            handleChange={handleChange}
            addTodo={addTodo}
          />
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
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleCompleted={toggleCompleted}
                />
              ))}
            </div>
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
