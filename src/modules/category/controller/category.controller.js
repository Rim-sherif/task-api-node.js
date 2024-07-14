import CategoryModel from "../../../../dataBase/models/category.model.js"
import { handelError } from "../../../middelware/handelError.js";


// Create Category
export const createCategory = handelError(async (req, res, next) => {
  const category = new CategoryModel({ ...req.body});
  await category.save();
  res.status(201).json({ message: "Category created", category });
});

// Get Categories
export const getCategories = handelError(async (req, res, next) => {
  const categories = await CategoryModel.find();
  res.json({ message: "Categories fetched", categories });
});

// Update Category
export const updateCategory = handelError(async (req, res, next) => {
  const category = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Category updated", category });
});

// Delete Category
export const deleteCategory = handelError(async (req, res, next) => {
  await CategoryModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});
