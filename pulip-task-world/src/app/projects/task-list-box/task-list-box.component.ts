import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskListBox } from '../task-list-box/task-list-box';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-task-list-box',
  templateUrl: './task-list-box.component.html',
  styleUrls: ['./task-list-box.component.css']
})
export class TaskListBoxComponent{
  @Input()  public taskListData: TaskListBox;
  @Input()  public projectId: number;
  @Output()  public changeTaskListDataEvent: EventEmitter<any> = new EventEmitter<any>(); /* change data */
  @Output()  public sendTaskIdEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  
  public order: string = 'Order';
  public ascending: boolean = true;
  public taskTitle: string;
  public taskId: number;
  public taskListId: number;
  public firedEnterKeyEvent: boolean = false;
  public dropdownMenu: Array<any> = [];
  constructor(
    private dataService: DataService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit(){    
    this.taskTitle = this.taskListData['Name'];
    this.taskListId = this.taskListData['Idx'];
    this.dropdownMenu = [
      {
        name: '업무리스트 삭제', function: this.deleteTaskList, params: this.taskListData['Idx']
      },
      {
        name: '이동', function: this.moveTaskList, params: undefined
      }
    ];
    // console.log('taskListData :: ', this.taskListData);
  }
  sendTaskId(_taskId){
    this.sendTaskIdEvent.emit(_taskId);
    this.taskId = _taskId;
  }
  deleteTaskList(_taskListIdx){
    let taskList = {
      'task_group_idx': _taskListIdx
    };    
    this.changeTaskListDataEvent.emit({
      data: taskList,
      section: 'task-list',
      method: 'delete'
    });

    console.log(_taskListIdx)
    // this.dataService.deleteTaskGroup(taskList, this.deleteTaskListComplete, this)
  }
  deleteTaskListComplete(_data, _this){
    let data = {
      data: _data,
      section: 'task-list',
      method: 'delete'
    };
    this.changeTaskListDataEvent.emit(data);
  }
  updateTaskList(_taskListName){
    let newTaskList = {
      'task_group_idx': this.taskListData['Idx'],
      'task_group_name': _taskListName,
      'projectid': this.projectId,
      'order_no': this.taskListData['Order'],
      'memberidx': 31321  
    };
    if(_taskListName != this.taskTitle)  this.dataService.updateTaskList(newTaskList, this.updateTaskListComplete, this);
  }
  updateTaskListComplete(_data, _this){
    
  }
  changeDataTaskListName(_e){
    console.log(this.taskListData['Idx'])
    if(_e){ // 동기화 되는 화면이 없으므로 바로 api처리, sevice에 해당하는 data도 없음
      this.firedEnterKeyEvent = true;
      // this.projectInfoBoxService.setTaskSubData('Name', this.taskListData['Name']);
    }else{
      if(this.firedEnterKeyEvent == false){
        // this.projectInfoBoxService.setTaskSubData('Name', this.taskListData['Name']);
      }else{
        this.firedEnterKeyEvent = false;
      }
    }
  }
  moveTaskList(){console.log('moveTaskList')}
}
