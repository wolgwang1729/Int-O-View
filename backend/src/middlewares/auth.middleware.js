import { ApiError } from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

const isAuthenticated = async (req, res, next)=>{
    
    try {

        const sessionToken = req.cookies?.sessionToken
    
        if (!sessionToken){
            throw new ApiError(401, "Unauthorized request !")
        }
        const decodedToken = jwt.verify(sessionToken, process.env.SESSION_TOKEN_KEY)
        
        const user = await User.findById(decodedToken._id).select("-sessionToken")

        if (!user){
            throw new ApiError(404, "user not found")
        }

        req.user = user
        next()


    } catch (error) {
        
        next(error)  
    }



}

export {
    isAuthenticated
}