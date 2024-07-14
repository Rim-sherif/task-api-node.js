import TaskModel from "../../../../dataBase/models/task.model.js";
import { handelError } from "../../../middelware/handelError.js";
import ApiFeatures from "../../../Utiletis/apiFeatures.js";
import {AppError} from '../../../Utiletis/AppError.js'
 
// Create Task
export const createTask = handelError(async (req, res, next) => {
  const task = new TaskModel({ ...req.body, user: req.user._id });
  await task.save();
  res.status(201).json({ message: "Task created", task });
});

// Get Tasks
export const getTasks = handelError(async (req, res, next) => {
  let query = TaskModel.find();

  const features = new ApiFeatures(query, req.query)
    .filter()
    .sort()
    .pagination();

  const tasks = await features.mongooseQuery;

  res.json({ message: "Tasks fetched", tasks });
});

// Get Single Task
export const getTask = handelError(async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const task = await TaskModel.findById(id).populate('category', 'name');
  if (!task) return next(new AppError("Task not found", 404));
  if (!task.isPublic && (!user || task.user.toString() !== user._id.toString())) {
    return next(new AppError("You do not have access to this task", 403));
  }
  res.json({ message: "Task fetched", task });
});

// Get All Tasks for One User
export const getAllUserTasks = handelError(async (req, res, next) => {
  const { user } = req;
  if (!user) return next(new AppError("User not authenticated", 401));
  const tasks = await TaskModel.find({ user: user._id }).populate('category', 'name');
  if (!tasks.length) return next(new AppError("No tasks found for this user", 404));

  res.json({ message: "Tasks fetched", tasks });
});


// Update Task
export const updateTask = handelError(async (req, res, next) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  if (!task) return next(new AppError("Task not found", 404));
  Object.assign(task, req.body);
  await task.save();
  res.json({ message: "Task updated", task });
});

// Delete Task
export const deleteTask = handelError(async (req, res, next) => {
  const { id } = req.params;
  const task = await TaskModel.findByIdAndDelete(id);
  if (!task) return next(new AppError("Task not found", 404));
  res.json({ message: "Task deleted" });
});

