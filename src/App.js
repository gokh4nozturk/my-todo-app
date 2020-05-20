import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import './App.css';
import Todo from './components/Todo';
import uniqid from 'uniqid';

function App() {
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState();
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
  const addTodoFirst = () => {
    alert('henüz çalışmıyor diğerini deneyiniz');
  };
  const deleteTodo = (id) => {
    const newArray = todo.filter((todos) => todos.id !== id);
    setTodo(newArray);
  };
  const editTodo = (inputEdit, inputId) => {
    setEditMode(inputId);
    alert(`${inputEdit} için düzenleme yapacaksınız.`);
    setInput(inputEdit);
  };
  const toggleCompleted = (id) => {
    const editTodo = todo.map((title) => {
      if (title.id === id) return { ...title, completed: !title.completed };
      return title;
    });
    setTodo(editTodo);
  };

  return (
    <div className="App">
      <div className="container shadow-sm p-3 mb-5 bg-white rounded">
        <h4 style={{ marginBottom: '20px' }}>My To Do</h4>

        {/* parça 1 */}
        <div className="grid-part-1 shadow p-3 mb-5 bg-white rounded">
          <div className="todo-container">
            <h6>Today's To Do</h6>
          </div>
          <div className="input-group mb-3 todo-add-container">
            <input
              name="input"
              type="text"
              className="form-control"
              placeholder="enter to do"
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <div className="input-group-append">
              <button
                onClick={addTodoFirst}
                className="btn btn-primary"
                type="button"
                id="button-add"
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>

        {/* parça 2 */}
        <div className="grid-part-2 shadow p-3 mb-5 bg-white rounded">
          Boş alan
        </div>

        {/* parça 3 */}
        <div className="grid-part-3 shadow p-3 mb-5 bg-white rounded">
          <div className="todo-container">
            <h6>To Do</h6>

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

            <div className="input-group mb-3 todo-add-container">
              <input
                id="input-todo"
                value={input}
                name="input"
                type="text"
                className="form-control"
                placeholder="enter to do"
                onChange={(e) => setInput(e.currentTarget.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
