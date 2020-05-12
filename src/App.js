import React, { useState, useLayoutEffect } from 'react';
import Axios from 'axios';
import { useFetchData } from './myhooks';
import './App.css';

function App() {
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
  useLayoutEffect(() => {
    onGetTodo();
  }, []);

  const addTodo = () => {
    // console.log(input);
    setTodo([...todo, { input, id: todo.length }]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodo([...todo.filter((todos) => todos.id !== id)]);
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
              <div className="todo-view">
                {todofetch.data.map((data) => (
                  <div className="card card-main">
                    <i className="fas fa-check-square todo-checkbox"></i>
                    <p className="todo-p">{data.title}</p>
                    <i className="far fa-trash-alt todo-trash"></i>
                  </div>
                ))}
              </div>
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

        {/* parça 2 */}
        <div className="grid-part-2 shadow p-3 mb-5 bg-white rounded">
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
        </div>

        {/* parça 3 */}
        <div className="grid-part-3 shadow p-3 mb-5 bg-white rounded">
          <div className="todo-view">
            {todo.map((addedTodos) => (
              <div className="card card-main">
                <i className="fas fa-check-square todo-checkbox"></i>
                <p className="todo-p">{addedTodos.input}</p>
                <i
                  onClick={() => deleteTodo(addedTodos.id)}
                  className="far fa-trash-alt todo-trash"
                ></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

/*


      




{todofetch.status}
    {todofetch.status === 'loading' && <div>Loading</div>}
    {todofetch.status === 'error' && <div>{todofetch.error}</div>}


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
*/
