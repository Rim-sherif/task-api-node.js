import authRouter from "./auth/auth.routes.js"
import categoryRoutes from "./category/category.routes.js"
import taskRoutes from "./task/task.routes.js"



export const allRoutes = (app) =>{
    app.use("/api/v1/category",categoryRoutes)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/task",taskRoutes)

}