import {applyMiddleware, combineReducers, createStore} from "redux";
import {Todo_Reducer} from "./reducers/Todo_Reducer";
import thunk from "redux-thunk";
import {User_Reducer} from "./reducers/User_Reducer";

let reducers = combineReducers({
    todo : Todo_Reducer,
    user : User_Reducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
