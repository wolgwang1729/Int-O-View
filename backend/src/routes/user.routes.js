import {Router} from 'express'
import { rebootServer, callModel, createUser, sendOtp, uploadResume, verifyOtp, setUser, getDashboardData } from '../controllers/user.controllers.js'
import {isAuthenticated } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { get } from 'http'

const router = Router()

router.route("/rebootServer").get(rebootServer)
router.route("/sendOtp").post(sendOtp)
router.route("/verifyOtp").post(verifyOtp)

router.route("/uploadResume").post(upload.single("resume"),uploadResume)

router.route("/createUser").post(upload.fields([
    {
        name : "photo",
        maxCount : 1
    },
    {
        name : "resume",
        maxCount : 1,
        
    }
]),createUser)

router.route("/callModel").post(callModel)

router.route("/setUser").post(setUser)

router.route("/dashboardData").get(getDashboardData)


export default router


