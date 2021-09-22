import { addTask } from "./schemas/tasks";
import validator from "../../helpers/validator";

export const validateAddTask = (req, res, next) => {
    validator(addTask, req.body, res, next);
}