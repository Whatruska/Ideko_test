import {AxiosInstance} from "axios";
import {default as axios} from "axios"
import {Identifiable} from "../../types/Identifiable";

const BASE_URL :string = "http://jsonplaceholder.typicode.com/";

export class Api<T extends Identifiable> {
    private api_instance : AxiosInstance
    constructor(url? :string) {
        this.api_instance = axios.create({
            baseURL : BASE_URL + url
        })
    }

    public getInstances = async () : Promise<Array<T>> => {
        return await this.api_instance.get("").then(resp => resp.data);
    }

    public getInstanceById = async (id :number) : Promise<T> => {
        return await this.getInstances().then(arr => arr.filter(elem => elem.id === id).reduce((a,b) => {
            return a;
        }));
    }
}
