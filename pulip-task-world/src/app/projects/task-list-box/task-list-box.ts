import { TaskBox } from '../task-box/task-box';

export class TaskListBox{
  public task_group_idx: number;
  public task_group_name: string;
  public Parent_idx: number;
  public memberidx: number;
  public order_no: number;
  public regdatetime: string;
  public lastdatetime: string;
  public Task: TaskBox[]; 
  public isdel: string;
}
