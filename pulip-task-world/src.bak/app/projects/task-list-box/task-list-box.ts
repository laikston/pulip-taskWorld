import { TaskBox } from '../task-box/task-box';

export class TaskListBox{
  public Idx: number;
  public Name: string;
  public Parent_idx: number;
  public Level: number;
  public Order: number;
  public Reg_date: string;
  public Last_date: string;
  public Task: TaskBox[]; 
}
