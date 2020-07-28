import {ReducerState} from "../../types/ReducerState";
import {User} from "../../types/User";
import {ValidAction} from "../../types/ValidAction";
import {User_Api} from "../../dal/user_api/User_Api";

export interface User_State extends ReducerState{
    userArr : Array<User>
}

const TOGGLE_FETCHING = "USER/TOGGLE_FETCHING";
const SET_USERS = "USER/SET_USERS";

const initialState :User_State = {
    userArr : [],
    isFetching : false
}

const User_Reducer = (state = initialState, action :ValidAction<typeof TOGGLE_FETCHING | typeof SET_USERS>) :any => {
    let stateCopy = {...state};
    switch (action.type) {
        case TOGGLE_FETCHING : {
            stateCopy.isFetching = !stateCopy.isFetching;
            break;
        }

        case SET_USERS : {
            stateCopy.userArr = action.payload;
            break;
        }
    }
    return stateCopy;
}

const toggleFetching = () :ValidAction<typeof TOGGLE_FETCHING> => {
    return {
        type : TOGGLE_FETCHING
    }
}

const setUsers = (users :Array<User>) :ValidAction<typeof SET_USERS> => {
    return {
        type : SET_USERS,
        payload : users
    }
}

const fetchUsers = () :any => {
    return (dispatch:any) => {
        dispatch(toggleFetching());
        new User_Api().getInstances().then(resp => {
            dispatch(setUsers(resp));
            dispatch(toggleFetching());
        })
    }
}

export {User_Reducer, fetchUsers}
