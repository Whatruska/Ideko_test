import {Action} from "redux";

export interface ValidAction<T> extends Action{
    type : T,
    payload? : any
}
