import { Command } from 'commander';
import 'dotenv/config';
import { api } from './config/apiBins';
import Table from 'cli-table3';
import dayjs from 'dayjs';
import { getUserData } from './userActivity';

const program = new Command();
export enum status {
  inProgress = 'in-progress',
  todo = 'todo',
  done = 'done',
}

program.version('1.0.0').description('A simple todo list');

program.command('list').action(async () => {
  const tasks = await api.getTasks();

  const table = new Table({
    head: ['id', 'task', 'status', 'createAt', 'updateAt'],
  });

  table.push(
    ...tasks.map((task: any) => [
      task.id,
      task.task,
      task.status,
      dayjs(task.createAt).format('DD/MM/YYYY HH:mm'),
      dayjs(task.updateAt).format('DD/MM/YYYY HH:mm'),
    ])
  );
  console.log(table.toString());
});

program.command('add <task>').action(async (task) => {
  try {
    await api.addTask(task);
    console.log('Task agregado correctamente');
  } catch (error) {
    console.log(error);
  }
});

program.command('update <id> <text>').action(async (id, task) => {
  try {
    await api.updateTask(id, task);
    console.log(`id: ${id} Correctamente Actualizado`);
  } catch (error) {
    console.log(error);
  }
});

program.command('delete <id>').action(async (id: string) => {
  try {
    await api.deleteTask(id);
    console.log(`id: ${id} Correctamente eliminado`);
  } catch (error) {
    console.log(error);
  }
});

program.command('mark-in-progress <id>').action(async (id) => {
  await api.changeStatus(id, status.inProgress);
});
program.command('mark-done <id>').action(async (id) => {
  await api.changeStatus(id, status.done);
});

program.command('github-activity <user>').action(async (user) => {
  const userActivity = await getUserData(user);
  if (!userActivity) return;
  for (const actvity of userActivity) {
    console.log(`la actividad ${actvity.type} tiene ${actvity.count} eventos`);
  }
});
program.parse(process.argv);
