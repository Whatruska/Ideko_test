import {AxiosInstance} from "axios";
import {default as axios} from "axios"

const BASE_URL :string = "http://jsonplaceholder.typicode.com/";

export class Api<T> {
    private api_instance : AxiosInstance
    constructor(url? :string) {
        this.api_instance = axios.create({
            baseURL : BASE_URL + url
        })
    }

    public getInstances = async () : Promise<Array<T>> => {
        return await this.api_instance.get("").then(resp => resp.data);
    }
}
