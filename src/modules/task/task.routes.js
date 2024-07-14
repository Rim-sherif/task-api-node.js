import express from 'express';
import { createTask, deleteTask, getAllUserTasks, getTask, getTasks, updateTask } from './controller/task.controller.js';
import protectRoutes from "../auth/auth.controller.js"


const taskRoutes = express.Router();


taskRoutes.route("/")
    .post(protectRoutes,createTask)
    .get(getTasks)
    .get(protectRoutes,getAllUserTasks)


    taskRoutes.route("/:id")
    .get(getTask)
    .patch(protectRoutes,updateTask)
    .delete(protectRoutes,deleteTask)








export default taskRoutes;