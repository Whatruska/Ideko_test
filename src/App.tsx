import React, {useState} from 'react';
import './App.css';
import {Todo_Api} from "./dal/todo_api/Todo_Api";
import {Todo} from "./models/Todo";

function App() {
  let [todos, setTodos] = useState<Array<Todo>>([]);
  new Todo_Api().getInstances().then(resp => {
    let arr :Array<Todo> = resp;
    setTodos(arr);
  })
  return (
    <div className="App">
      {JSON.stringify(todos)}
    </div>
  );
}

export default App;
