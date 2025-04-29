import express, { json } from "express"
import config from "config"
import sequelize from "./db/sequelize"
import profileRouter from "./routers/profileRouter"
import errorLogger from "./middlewares/error/error-logger"
import errorResponder from "./middlewares/error/error-responder"
import notFound from "./middlewares/not-found"
import feedRouter from "./routers/feedRouter"
import followRouter from "./routers/followsRouter"
import commentsRouter from "./routers/commentsRouter"
import authRouter from "./routers/authRouter"
import getUser from './middlewares/auth/get-user'
import requireAuth from './middlewares/auth/require-auth'
import cors from 'cors'
import fileUpload from "express-fileupload"
import { createAppBucketIfNotExists } from "./aws/aws"

const app = express();


export async function start() {
    try {
        console.log('******************************')
        console.log('Trying to Connect to Database')
        console.log('******************************')

        await sequelize.sync()
        console.log('********************************')
        console.log('Database logged in successfully')
        console.log('********************************')


        await createAppBucketIfNotExists()

        app.use(cors({
            origin: process.env.NODE_ENV === 'compose' 
              ? ['http://localhost:5173', 'http://frontend'] 
              : 'http://localhost:5173',
            credentials: true
          }));

        //middlewares
        app.use(json()) //middleware to extract the post/put/patch data and save it to the request object in case the content type of the request is application json
        app.use(fileUpload())

        app.use('/auth', authRouter)

        app.use(getUser)

        app.use(requireAuth)
        app.use('/follows', followRouter)
        app.use('/profile', profileRouter)
        app.use('/feed', feedRouter)
        app.use('/comments', commentsRouter)
      
        
        //special notFound middleware
        app.use(notFound)

        //error middlewares
        app.use(errorLogger)
        app.use(errorResponder)

    } catch (error) {
        console.log('Error resetting database', error)
    }
}

export default app


