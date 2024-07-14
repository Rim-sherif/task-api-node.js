import express from 'express';
import {createCategory,deleteCategory,getCategories, updateCategory } from './controller/category.controller.js';
import protectRoutes from "../auth/auth.controller.js"

const categoryRoutes = express.Router();


categoryRoutes.route("/")
    .post(protectRoutes,createCategory)
    .get(protectRoutes,getCategories)


    categoryRoutes.route("/:id")
    .put(protectRoutes,updateCategory)
    .delete(protectRoutes,deleteCategory)








export default categoryRoutes;