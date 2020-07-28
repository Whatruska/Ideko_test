import {Identifiable} from "./Identifiable";

export interface Todo extends Identifiable{
    userId :number,
    title :string,
    completed :boolean
}
