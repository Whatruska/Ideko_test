import {Todo_State} from "../bll/reducers/Todo_Reducer";
import {User_State} from "../bll/reducers/User_Reducer";

export interface ReduxState {
    todo :Todo_State,
    user :User_State
}
