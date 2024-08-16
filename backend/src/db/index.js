import mongoose from 'mongoose'
import { dbName } from '../constants.js'

export const connectDb = async()=>{
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${dbName}`)
        console.log(`mongoose connected successfully on port ${connectionInstance.connection.port} !!!`)
        
    } catch (error) {
        console.log("mongodb connection error !!! " + error)
        process.exit(1)
    }
}
