// In-memory "database" for simplicity
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build Jenkins pipeline', completed: false }
  ];
  
  class Task {
    static getAll() {
      return tasks;
    }
  
    static getById(id) {
      return tasks.find(task => task.id === parseInt(id));
    }
  
    static create(newTask) {
      const task = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        ...newTask,
        completed: false
      };
      tasks.push(task);
      return task;
    }
  
    static update(id, updatedTask) {
      const index = tasks.findIndex(task => task.id === parseInt(id));
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        return tasks[index];
      }
      return null;
    }
  
    static delete(id) {
      const index = tasks.findIndex(task => task.id === parseInt(id));
      if (index !== -1) {
        return tasks.splice(index, 1)[0];
      }
      return null;
    }
  }
  
  module.exports = Task;