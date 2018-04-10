import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskBox } from '../task-box/task-box';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.css']
})
export class TaskBoxComponent implements OnInit {
  @Input()  public taskData:TaskBox;
  @Output()  public sendTaskIdEvent: EventEmitter<number> = new EventEmitter<number>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  constructor() { }
  ngOnInit() {
    console.log('taskData :: ', this.taskData);
  }
  goTaskDetail(_taskDataIdx){
    this.sendTaskIdEvent.emit(this.taskData.Idx); 
  }
}