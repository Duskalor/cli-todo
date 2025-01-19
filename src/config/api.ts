import fs from 'fs/promises';
import { status } from '..';

export const api = {
  writeTasks: async (tasks: any) =>
    await fs.writeFile('./DB.json', JSON.stringify({ tasks }, null, 2)),

  getTasks: async (status?: status) => {
    const data = await fs.readFile('./DB.json');
    const { tasks } = JSON.parse(data.toString('utf8'));
    return status ? tasks.filter((t: any) => t.status === status) : tasks;
  },

  getTaskbyId: async (id: number) => {
    const tasks = await api.getTasks();
    return tasks.find((t: any) => t.id === id);
  },

  addTask: async (task: any) => {
    try {
      const tasks = await api.getTasks();
      tasks.push({
        id: tasks.length + 1,
        task,
        status: status.todo,
        createAt: new Date(),
        updateAt: new Date(),
      });
      await api.writeTasks(tasks);
    } catch (error) {
      await api.writeTasks([
        {
          id: 1,
          task,
          status: status.todo,
          createAt: new Date(),
          updateAt: new Date(),
        },
      ]);
    }
  },

  updateTask: async (id: string, task: any) => {
    const tasks = await api.getTasks();
    const indexTask = tasks.findIndex((v: any) => v.id === +id);
    const newTasks = tasks.with(indexTask, {
      ...tasks[indexTask],
      task,
      updateAt: new Date(),
    });
    await api.writeTasks(newTasks);
  },
  deleteTask: async (id: string) => {
    const tasks = await api.getTasks();
    const taskUpdate = tasks.filter((v: any) => v.id !== +id);
    await api.writeTasks(taskUpdate);
  },

  changeStatus: async (id: string, status: status) => {
    const tasks = await api.getTasks();
    const indexTask = tasks.findIndex((v: any) => v.id === +id);
    const newTasks = tasks.with(indexTask, { ...tasks[indexTask], status });
    await api.writeTasks(newTasks);
    console.log(`status correctamente actualizado en id : ${id}`);
  },
};
