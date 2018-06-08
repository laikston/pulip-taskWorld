import { CheckBox } from '../check-box/check-box';

export class TaskBox {
  public Idx: number;
  public Name: string;
  public Order: number;
  public Parent_idx: number;
  public AssiMember: Array<any>;  
  public Start_date: string;
  public End_date: string;
  public Last_date: string;
  public Reg_date: string;
  public File: Array<any>;
  public Tag: Array<any>;
  public CheckList: Array<CheckBox>;

  
  // public Writer: string;
  // public Write_date: string;
  // public Complete: string;
  // public Reg_date: string;
  // public Last_date: string;
  // public Content: string;
}
