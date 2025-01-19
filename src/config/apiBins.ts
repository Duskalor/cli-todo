import { status } from '..';
import { ITaskResponse } from '../interface/task.interface';
import { BIN_ID, URL, XAccessKey, XMasterKey } from '../lib/config';

const getData = async () => {
  const res = await fetch(`${URL}/${BIN_ID}`, {
    method: 'GET',
    headers: {
      'X-Master-Key': XMasterKey,
      'X-Access-Key': XAccessKey,
    },
  });
  const {
    record: { tasks },
  } = await res.json();
  return tasks as ITaskResponse[];
};

const updatedata = async (data: any) => {
  const res = await fetch(`${URL}/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'X-Master-Key': XMasterKey,
      'X-Access-Key': XAccessKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tasks: data }),
  });
  const a = await res.json();
  console.log({ a });
};

export const api = {
  writeTasks: async (tasks: ITaskResponse[]) => {
    await updatedata(tasks);
  },

  getTasks: async (status?: status) => {
    const tasks = await getData();
    return status ? tasks.filter((v: any) => v.status === status) : tasks;
  },

  getTaskbyId: async (id: number) => {
    const tasks = await getData();
    return tasks.find((v: any) => v.id === id);
  },

  addTask: async (task: any) => {
    try {
      const tasks = await getData();
      console.log(tasks);
      tasks.push({
        task,
        id: tasks.length + 1,
        status: status.todo,
        createAt: new Date(),
        updateAt: new Date(),
      });
      await updatedata(tasks);
    } catch (error) {
      await updatedata([
        {
          task,
          id: 1,
          status: status.todo,
          createAt: new Date(),
          updateAt: new Date(),
        },
      ]);
    }
  },

  updateTask: async (id: string, task: any) => {
    const tasks = await getData();
    const indexTask = tasks.findIndex((v: any) => v.id === +id);
    const newTasks = tasks.with(indexTask, {
      ...tasks[indexTask],
      task,
      updateAt: new Date(),
    });
    await updatedata(newTasks);
    console.log(`status correctamente actualizado en id : ${id}`);
  },
  deleteTask: async (id: string) => {
    const tasks = await getData();
    const taskUpdate = tasks.filter((v: any) => v.id !== +id);
    await updatedata(taskUpdate);
    console.log(`status correctamente actualizado en id : ${id}`);
  },

  changeStatus: async (id: string, status: status) => {
    const tasks = await getData();
    const indexTask = tasks.findIndex((v: any) => v.id === +id);
    const newTasks = tasks.with(indexTask, { ...tasks[indexTask], status });
    await updatedata(newTasks);
    console.log(`status correctamente actualizado en id : ${id}`);
  },
};
