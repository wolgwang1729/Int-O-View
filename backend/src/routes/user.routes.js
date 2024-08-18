import {Router} from 'express'
import { callModel, createUser } from '../controllers/user.controllers.js'
import {isAuthenticated } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

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

router.route("/callModel").post(isAuthenticated,callModel)

export default router


