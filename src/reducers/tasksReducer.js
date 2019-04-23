import { CREATE_TASK, DELETE_TASK, LOAD_TASKS, UPDATE_TASK } from '../constants/actionTypes';
import initialState from './initialState';

export default function tasksReducer(state = initialState.tasks, action) {
  let newState = state;

  switch (action.type) {
    case LOAD_TASKS:
      newState = Object.assign({}, state, { tasks: fetchTasksForCurrentUser() });
      break;
    case CREATE_TASK:
      newState = Object.assign({}, state, { tasks: createTask(action.payload, state.tasks) });
      break;
    case DELETE_TASK:
      newState = Object.assign({}, state, { tasks: deleteTask(action.payload, state.tasks) });
      break;
    case UPDATE_TASK:
      newState = Object.assign({}, state, { tasks: updateTask(action.payload, state.tasks) });
      break;
    default:
      return state;
  }

  saveTasksForCurrentUser(newState.tasks);
  return newState;
}

export function fetchTasksForCurrentUser() {
  const { userName, tasksByUser } = getMatadataFromStorage();
  return tasksByUser[userName] || [];
}

export function saveTasksForCurrentUser(tasks = []) {
  const { userName, tasksByUser } = getMatadataFromStorage();
  tasksByUser[userName] = tasks;
  sessionStorage.setItem('tasksByUser', JSON.stringify(tasksByUser));
}

export function deleteTask(task, tasks = []) {
  return tasks.filter(t => t.id !== task.id);
}

export function updateTask(task, tasks = []) {
  const index = tasks.findIndex(t => t.id === task.id);
  if (index > -1) {
    tasks[index] = task;
  }
  return [...tasks];
}

export function createTask(task, tasks = []) {
  task.id = tasks.length;
  return [...tasks, task];
}

function getMatadataFromStorage() {
  const authUserStr = sessionStorage.getItem('authUser') || 'undefined';
  const { userName } = authUserStr === 'undefined' ? {} : JSON.parse(authUserStr);
  const tasksStr = sessionStorage.getItem('tasksByUser') || 'undefined';
  const tasksByUser = tasksStr === 'undefined' ? {} : JSON.parse(tasksStr);
  return {
    userName,
    tasksByUser,
  }
}