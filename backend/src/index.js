import {connectDb} from './db/index.js'
import {app} from './app.js'
import dotenv from 'dotenv'

dotenv.config({
    path : ".env"
})

const port = process.env.PORT || 8000

connectDb()
.then(()=>{
    app.on("error", function(error){
        console.log("error on setting server " + error)
    })

    app.listen(port, function(){
        console.log(`server started on port ${port}`)
    })
})