import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useFetchData } from './myhooks';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './App.css';

function App() {
  const textbox = document.getElementById('input-todo');
  const [todo, setTodo] = useState([
    { id: 0, input: 'todo 1' },
    { id: 1, input: 'todo 2' },
    { id: 2, input: 'todo 3' },
  ]);
  const [input, setInput] = useState('');
  // console.log(input);

  const [todofetch, _todoFetch] = useFetchData();

  async function onGetTodo() {
    try {
      _todoFetch.onLoading();
      const data = await Axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      ).then((response) => response.data);
      // console.log(data);
      _todoFetch.onSuccess(data);
    } catch (error) {
      _todoFetch.onError('Todo gelmedi.');
    }
  }
  useEffect(() => {
    // onGetTodo();
  });

  const addTodo = (e) => {
    if (input !== '' || textbox.value !== '') {
      setTodo([...todo, { input, id: todo.length }]);
      setInput('');
    } else {
      alert('doldur');
    }
  };

  const addTodoFirst = () => {
    alert('henüz çalışmıyor diğerini deneyiniz');
  };

  const deleteTodo = (id) => {
    setTodo([...todo.filter((todos) => todos.id !== id)]);
  };

  const editTodo = (inputEdit, inputId) => {
    alert(`${inputEdit} için düzenleme yapacaksınız.`);
    textbox.value = inputEdit;
  };

  return (
    <div className="App">
      <div className="container shadow-sm p-3 mb-5 bg-white rounded">
        <h4 style={{ marginBottom: '20px' }}>My To Do</h4>

        {/* parça 1 */}
        <div className="grid-part-1 shadow p-3 mb-5 bg-white rounded">
          <div className="todo-container">
            <h6>Today's To Do</h6>
            {todofetch.status === 'success' && (
              <SimpleBar style={{ maxHeight: '45vh' }}>
                <div className="todo-view">
                  {todofetch.data.map((data) => (
                    <div className="card card-main">
                      <i className="fas fa-check-square todoo-checkbox"></i>
                      <p className="todo-p">{data.title}</p>
                      <i className="far fa-trash-alt todo-trash"></i>
                    </div>
                  ))}
                </div>
              </SimpleBar>
            )}
            {todofetch.status !== 'success' && todofetch.status}
            {todofetch.status === 'loading' && <div>Loading</div>}
            {todofetch.status === 'error' && <div>{todofetch.error}</div>}
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
            <SimpleBar style={{ maxHeight: '45vh' }}>
              <div className="todo-view">
                {todo.map((addedTodos) => (
                  <div className="card card-main">
                    <i className="fas fa-check-square todo-checkbox"></i>
                    <p
                      onClick={() => editTodo(addedTodos.input, addedTodos.id)}
                      className="todo-p"
                    >
                      {addedTodos.input}
                    </p>
                    <i
                      onClick={() => deleteTodo(addedTodos.id)}
                      className="far fa-trash-alt todo-trash"
                    ></i>
                  </div>
                ))}
              </div>
            </SimpleBar>

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
                  Add Todo
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
