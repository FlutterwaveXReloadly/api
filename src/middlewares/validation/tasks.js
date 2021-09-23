import {
  addTask,
  updateTask,
  registerCompletion,
  registerProgress,
  approveInterest
} from "./schemas/tasks";
import validator from "../../helpers/validator";

export const validateAddTask = (req, res, next) => {
  validator(addTask, req.body, res, next);
};

export const validateUpdateTask = (req, res, next) => {
  validator(updateTask, req.body, res, next);
};

export const validateRegisterCompletion = (req, res, next) => {
  validator(registerCompletion, req.body, res, next);
};

export const validateRegisterProgress = (req, res, next) => {
  validator(registerProgress, req.body, res, next);
};

export const validateApproveInterest = (req, res, next) => {
  validator(approveInterest, req.body, res, next);
}