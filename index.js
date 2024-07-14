import express from 'express';
import 'dotenv/config.js' 
import { connection } from './dataBase/connection.js';
import { allRoutes } from './src/modules/routes.js';
import { globalError } from './src/Utiletis/globalErrorHandling.js';
import { AppError } from './src/Utiletis/AppError.js';
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())


connection()

allRoutes(app)

app.use("*",(req,res,next)=>{
    next(new AppError("url not found",404))
})

app.use(globalError)



app.listen(process.env.PORT || port,()=> console.log(`server is run ${port}`))