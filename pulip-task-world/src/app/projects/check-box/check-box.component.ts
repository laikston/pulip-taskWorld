import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CheckBox } from '../check-box/check-box';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input()  public checkData: CheckBox;
  @Input()  public hasEdit: boolean;
  @Input()  public projectId: number;
  @Input()  public taskId: number;
  @Output()  public changeCheckDataEvent = new EventEmitter<any>();
  public isComplete: boolean;
  constructor(
    private dataService: DataService
   ) { }
  ngOnInit() {
    // console.log('checkData :: ', this.checkData);
  }
  deleteCheck(_checkData){ 
    let checkData: any = {
      'project_idx': this.projectId,
      'checklist_idx': _checkData['Idx']
    }
    this.dataService.deleteCheck(checkData, this.deleteCheckComplete, this);
  }
  deleteCheckComplete(_data, _this){console.log('checklist 삭제 :: ', _data.msg);}
  changeCheck(_checkData, _item){
    let checkData: any = {};
    if(_item)  this.checkData['Complete'] = (_checkData['Complete'] === 'N') ? 'Y' : 'N' ;
    checkData = {
      'project_idx': this.projectId,
      'task_idx': this.taskId,
      'checklist_idx': _checkData['Idx'],
      'checklist_name': _checkData['Name'],
      'isfinish': this.checkData['Complete'],
      'order_no': _checkData['Order']
    };
    this.dataService.changeCheck(checkData, this.changeCheckComplete, this);
  }
  changeCheckComplete(_data, _this){console.log('checklist 수정 :: ', _data.msg);}
}