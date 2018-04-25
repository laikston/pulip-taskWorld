import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskListBox } from '../task-list-box/task-list-box';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-task-list-box',
  templateUrl: './task-list-box.component.html',
  styleUrls: ['./task-list-box.component.css']
})
export class TaskListBoxComponent{
  @Input()  public taskListData: TaskListBox;
  @Input()  public projectId: number;
  @Output()  public sendTaskIdEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  public order: string = 'Order';
  public ascending: boolean = true;
  public taskTitle: string;
  constructor(
    private dataService: DataService
  ) { }
  ngOnInit(){    
    this.taskTitle = this.taskListData['Name'];
    // console.log('taskListData :: ', this.taskListData);
  }
  sendTaskId(_taskId){
    this.sendTaskIdEvent.emit(_taskId);
  }
  deleteTaskList(_taskListIdx){
    let taskList = {
      'task_group_idx': _taskListIdx
    };
    this.dataService.deleteTaskGroup(taskList, this.deleteTaskGroupComplete, this)
  }
  deleteTaskGroupComplete(_data, _this){

  }
  updateTaskList(_taskListName){
    let newTaskList = {
      'task_group_idx': this.taskListData['Idx'],
      'task_group_name': _taskListName,
      'projectid': this.projectId,
      'order_no': this.taskListData['Order'],
      'memberidx': 31321  
    };
    if(_taskListName != this.taskTitle)  this.dataService.updateTaskGroup(newTaskList, this.updateTaskGroupComplete, this);
  }
  updateTaskGroupComplete(_data, _this){
    
  }
}
