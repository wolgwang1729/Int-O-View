import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json({
    limit : '16kb'
}))

app.use(express.urlencoded({
    limit : '16kb',
    extended : true
}))

app.use(cors({
    origin : process.env.ORIGIN,
    credentials : true
}))

app.use(express.static("/public"))


//importing routes
import userRoutes from './routes/user.routes.js'

app.use('/api/v1/user',userRoutes)

export {
    app
}
