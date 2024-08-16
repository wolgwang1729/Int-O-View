import {asyncHandler} from '../utils/asynchandler.js'
import axios from 'axios'


const callModel = asyncHandler(async (req, res)=>{

    const { query } = req.body

    const response = await axios.post('http://localhost:5000/predict',{query},{
        withCredentials : true
    })

    res.json({
        message : response.data.message
    })
})

export {
    callModel
}