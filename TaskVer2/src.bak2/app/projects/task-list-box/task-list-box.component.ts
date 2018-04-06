import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskListBox } from '../task-list-box/task-list-box';

@Component({
  selector: 'app-task-list-box',
  templateUrl: './task-list-box.component.html',
  styleUrls: ['./task-list-box.component.css']
})
export class TaskListBoxComponent{
  @Input()  public taskListData: TaskListBox;
  @Output()  public sendTaskIdEvent: EventEmitter<number> = new EventEmitter<number>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  constructor() { }
  ngOnInit(){
    console.log('taskListData :: ', this.taskListData);
  }
  sendTaskId(_taskId){
    this.sendTaskIdEvent.emit(_taskId);
  }
}
