import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskBox } from '../task-box/task-box';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.css']
})
export class TaskBoxComponent implements OnInit {
  @Input()  public taskData: TaskBox;
  @Output()  public sendTaskPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  public isComplete: boolean;
  constructor() { }
  ngOnInit() {
    // console.log('taskData :: ', this.taskData);
    this.isComplete = (this.taskData.Complete == 'Y') ? true : false ;
  }
  goTaskDetail(_taskDataIdx: number, _taskDataName: string){
    let prop: any = {
      id: _taskDataIdx,
      name: _taskDataName
    };
    this.sendTaskPropEvent.emit(prop); 
  }
  changeCompleteState(){
    console.log(this.isComplete)
  }
}