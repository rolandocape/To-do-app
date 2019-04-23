import { CREATE_TASK, DELETE_TASK, LOAD_TASKS, UPDATE_TASK } from '../constants/actionTypes';

export const createTask = (task) => ({ type: CREATE_TASK, payload: task });
export const deleteTask = (task) => ({ type: DELETE_TASK, payload: task });
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });
export const loadTasks = () => ({ type: LOAD_TASKS });
