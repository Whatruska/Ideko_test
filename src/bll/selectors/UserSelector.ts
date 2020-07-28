import {ReduxState} from "../../models/ReduxState";
import {User} from "../../models/User";

export class UserSelector {
    static getUserArr = (state :ReduxState) :Array<User> => {
        return state.user.userArr;
    }

    static isFetching = (state :ReduxState) :boolean => {
        return state.user.isFetching;
    }
}
