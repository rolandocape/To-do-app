export function getTasksList() {
    const tasks = [];
    return tasks;
}

export function createNewTask(task) {
    const tasks = [];
    tasks.push(task);
    return tasks;
}

export function deleteTask(taskToRemove) {
    const tasks = [];
    const index = tasks.findIndex(task => task.id ===  taskToRemove.id);
    tasks.splice(index, 1);
    return tasks;
}