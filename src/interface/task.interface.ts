import { status } from '..';

export interface ITaskResponse {
  task: string;
  id: number;
  status: status;
  createAt: Date;
  updateAt: Date;
}
