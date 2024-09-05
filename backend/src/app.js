import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin : process.env.ORIGIN,
    credentials : true,
}))

app.use(express.json({
    limit : '16kb'
}))

app.use(express.urlencoded({
    limit : '16kb',
    extended : true
}))


app.use(express.static("/public"))
app.use(cookieParser())


//importing routes
import userRoutes from './routes/user.routes.js'
import { errorHandler } from './middlewares/errorHandler.middleware.js'

app.use('/api/v1/user',userRoutes)
app.use(errorHandler)

export {
    app
}
