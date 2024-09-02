import axios, { AxiosInstance, AxiosResponse } from "axios";


export class Api{

    public client : AxiosInstance

    constructor(baseURL : string){
        this.client = axios.create({
            baseURL,
            headers : {
                "Content-Type" : "application/json"
            },
            withCredentials : true
        })
    }

    async post(endpoint : string, body:object, headers:object):Promise<any>{
        try {

            const response : AxiosResponse = await this.client.post(endpoint,body,{headers})
            return response.data
            
        } catch (error : any) {
            throw error.response? error.response.data : new Error("Network Error")
        }
    }

    async get(endpoint : string, headers : object): Promise<any>{
        try {
            
            const response : AxiosResponse = await this.client.get(endpoint,{headers})
            return response.data

        } catch (error : any) {
            throw error.response ? error.response.data : new Error("Network Error")
        }
    }
}

