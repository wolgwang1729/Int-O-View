import {asyncHandler} from '../utils/asynchandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiresponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import axios from 'axios'
import jwt from 'jsonwebtoken'


const perviousResponses = {}
const createUser = asyncHandler(async (req, res)=>{
    
    const { fullName, email, phone, post } = req.body

    if (
        [fullName, email, phone, post].some(field => field === undefined)
    ){
        throw new ApiError(400, "All fields are required")
    }

    const searchUser = await User.findOne({
        $and : [
            {
                email
            },
            {
                phone
            }
        ]
    })

    //checks for multiple access at a time
    if (searchUser){
        throw new ApiError(400, "User already Exist !")
    }

    if (searchUser && searchUser.status !== "pending"){
        throw new ApiError(400, "User already Interviewed !")
    }

    const photoLocalPath = req.files?.photo[0]?.path
    const resumeLocalPath = req.files?.resume[0]?.path

    if (!photoLocalPath && !resumeLocalPath){
        throw new ApiError(400, "Both user photo and resume required !")
    }

    const photo = await uploadOnCloudinary(photoLocalPath)
    const resume = await uploadOnCloudinary(resumeLocalPath)


    const user = await User.create({
        fullName,
        email,
        phone : Number(phone),
        post,
        photo : photo?.url ?? "",
        resume : resume?.url ?? "",
    })


    if (!user){
        throw new ApiError(500, "server side error on creating user !")
    }


    const sessionToken = jwt.sign(
        {
            _id : user._id,
            email : user._email
        }, 
        process.env.SESSION_TOKEN_KEY,
        {
            expiresIn : "45m"
        }
    )

    user.sessionToken = sessionToken
    user.save({validateBeforeSave : false})

    const options = {
        httpOnly : true,
        secure : true,
        sameSite : 'None',
        maxAge : 60*60*1000
    }

    res.status(201)
    .cookie("sessionToken", sessionToken, options)
    .json(
        new ApiResponse(201, user, "user created successfully")
    )

})

//handling request to and from flask
const callModel = asyncHandler(async (req, res)=>{

    const { query } = req.body

    const response = await axios.post(process.env.FLASK_URL, { query },{
        withCredentials : true
    })

    perviousResponses[query] = response.data.message

    res.json({ 
        message : perviousResponses
    })

})


export {
    callModel,
    createUser
}