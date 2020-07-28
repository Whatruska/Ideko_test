import React from 'react';
// @ts-ignore
import { Provider } from 'react-redux';
import './App.css';
import store from "./bll/store";
import TodoList from "./comp/TodoList/TodoListContainer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoList/>
      </Provider>
    </div>
  );
}

export default App;
