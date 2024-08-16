import {Router} from 'express'
import {callModel} from '../controllers/user.controllers.js'

const router = Router()

router.route("/callModel").post(callModel)

export default router