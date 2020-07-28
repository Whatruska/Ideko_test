import React from 'react';
// @ts-ignore
import { Provider } from 'react-redux';
import './App.css';
import store from "./bll/store";
// @ts-ignore
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TodoList from "./comp/TodoList/TodoListContainer";
import EditTodoPageContainer from "./comp/EditTodoPage/EditTodoPageContainer";
import CreateTodoPageContainer from "./comp/CreateTodoPage/CreateTodoPageContainer";
import ProfilePageContainer from "./comp/ProfliePage/ProfilePageContainer";

function App() {
  return (
    <div className="App">
        <BrowserRouter basename={process.env.public_url}>
            <Provider store={store}>
                <Switch>
                    <Route path={"/"} exact>
                        <TodoList/>
                    </Route>
                    <Route path={"/create"}><CreateTodoPageContainer/></Route>
                    <Route path={"/edit/:id"}><EditTodoPageContainer/></Route>
                    <Route path={"/profile/:id"}><ProfilePageContainer/></Route>
                </Switch>
            </Provider>
        </BrowserRouter>
    </div>
  );
}

export default App;
