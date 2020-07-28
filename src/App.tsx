import React from 'react';
// @ts-ignore
import { Provider } from 'react-redux';
import './App.css';
import store from "./bll/store";
// @ts-ignore
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TodoList from "./comp/TodoList/TodoListContainer";

function App() {
  return (
    <div className="App">
        <BrowserRouter basename={process.env.public_url}>
            <Provider store={store}>
                <Switch>
                    <Route path={"/"} exact>
                        <TodoList/>
                    </Route>
                    <Route path={"/create"}>Create Page</Route>
                </Switch>
            </Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
