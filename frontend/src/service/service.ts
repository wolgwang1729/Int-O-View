import { Api } from "../api/api";


interface creatingUserData{
    fullName : string,
    email : string,
    phone : number,
    post : string,
    [key : string] : any
}

interface createdUserResponse{
    status : number,
    data : any,
    message : string,
    success : boolean
}

class Service{

    public api : Api

    constructor(){

        this.api = new Api(import.meta.env.VITE_BACKEND_URL)
    }


    async sendOtp(data : {email:string}){
        try {
            
            const response : object = await this.api.post("/sendOtp",data,{})
            return response


        } catch (error) {
            console.log("Error in sending otp ")
            throw error
        }
    }

    async verifyOtp(data : {email:string,otp:string}){
        try {
            
            const response : object = await this.api.post("/verifyOtp",data,{})
            return response


        } catch (error) {
            console.log("Error in verifying otp ")
            throw error
        }
    }

    async uploadResume(resume : File){
        try {

            const data = new FormData()

            data.append('resume', resume)

            
            const response : object = await this.api.post("/uploadResume",data,{
                "Content-Type": "multipart/form-data"
            })
            return response


        } catch (error) {
            console.log("Error in uploading resume ", error)
            throw error
        }
    }

    async createUser(incomingData : creatingUserData ,resume : File, photo : File){
        try {

            const data = new FormData()

            for (const key in incomingData){
                data.append(key,incomingData[key])
            }

            data.append('resume', resume)
            data.append('photo', photo)

            
            const response : createdUserResponse = await this.api.post("/createUser",data,{
                "Content-Type": "multipart/form-data"
            })
            return response


        } catch (error) {
            console.log("Error in creating user ")
            throw error
        }
    }

}

export const services = new Service()