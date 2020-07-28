import {User} from "../../models/User";
import {Api} from "../api/Api";
const USER_URL = "users"
export class User_Api extends Api<User>{
    constructor() {
        super(USER_URL);
    }
}
