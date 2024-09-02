import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    fullName : {
        type : String,
        required : [true,"fullname is required"],
        trim : true,
    },
    email : {
        type : String,
        required : [true,"email is required"],
        trim : true,
        lowercase : true,
        unique : true
    },
    phone : {
        type : Number,
        required : [true,"phone number is required"],
        unique : true

    },
    post : {
        type : String,
        enum : ["SDE","Ml-Engineer","Junior Research Fellow"],
        required : [true, "post is required"]
    },
    resume : {
        type : String,
        required : [true, "resume is required"],
        unique : true
    },
    photo : {
        type : String,
        required : [true, "resume is required"],
        unique : true
    },
    sessionToken : {
        type : String,
        default : "",
        unique : true
    },
    status : {
        type : String,
        enum : ["pending","accepted","rejected"],
        default : "pending"
    }
    

},{
    timestamps : true
})



export const User = mongoose.model("User",userSchema)