import {applyMiddleware, combineReducers, createStore} from "redux";
import {Todo_Reducer} from "./reducers/Todo_Reducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    todo : Todo_Reducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
