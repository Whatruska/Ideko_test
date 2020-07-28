import React, {useState} from 'react';
import './App.css';
import {Todo_Api} from "./dal/todo_api/Todo_Api";
import {Todo} from "./models/Todo";

function App() {
  let [todo, setTodo] = useState<Todo>({
    id : 1,
    title : "a",
    userId : 1,
    completed : false
  });
  new Todo_Api().getInstanceById(1).then(resp => {
    let arr :Todo = resp;
    setTodo(arr);
  })
  return (
    <div className="App">
      {JSON.stringify(todo)}
    </div>
  );
}

export default App;
