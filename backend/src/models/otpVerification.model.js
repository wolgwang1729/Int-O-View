import mongoose from "mongoose";


const otpVerificationSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    isVerified : {
        type : Boolean,
        default : false
    }
})

otpVerificationSchema.index({createdAt : 1}, {expireAfterSeconds : 3600})

export const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema)