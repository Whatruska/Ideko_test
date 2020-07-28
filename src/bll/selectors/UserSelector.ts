import {ReduxState} from "../../types/ReduxState";
import {User} from "../../types/User";

export class UserSelector {
    static getUserArr = (state :ReduxState) :Array<User> => {
        return state.user.userArr;
    }

    static isFetching = (state :ReduxState) :boolean => {
        return state.user.isFetching;
    }
}
