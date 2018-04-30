import { CheckBox } from '../check-box/check-box';

export class TaskBox {
  public Idx: number;
  public Name: string;
  public Parent_idx: number;
  public Level: number;
  public Order: number;
  public Writer: string;
  public Write_date: string;
  public Start_date: string;
  public End_date: string;
  public Complete: string;
  public Reg_date: string;
  public Last_date: string;
  public AssiMember: Array<any>;
  public Tag: Array<any>;
  public File: Array<any>;
  public CheckList: Array<CheckBox>;
  public Content: string;
}
