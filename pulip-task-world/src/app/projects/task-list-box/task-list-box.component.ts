import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskListBox } from '../task-list-box/task-list-box';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { IMyDpOptions } from '../../datepicker-box/interfaces/my-options.interface'; /* angular4-datepicker :: https://www.npmjs.com/package/angular4-datepicker */

@Component({
  selector: 'app-task-list-box',
  templateUrl: './task-list-box.component.html',
  styleUrls: ['./task-list-box.component.css']
})
export class TaskListBoxComponent implements OnInit {
  @Input()  public taskListData: TaskListBox;
  @Input()  public projectId: number;
  @Output()  public changeTaskListDataEvent: EventEmitter<any> = new EventEmitter<any>(); /* change data */
  @Output()  public sendTaskIdEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  
  public order: string = 'Order';
  public ascending: boolean = true;
  public taskListTitle: string;
  public taskId: number;
  public taskListId: number;
  public taskParentId: number;
  public firedEnterKeyEvent: boolean = false;
  public dropdownMenu: Array<any> = [];
  public isViewAddTaskForm: boolean = false;
  public newTaskName: string = undefined;
  constructor(
    private dataService: DataService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit(){    
    this.taskListTitle = this.taskListData['task_group_name'];
    this.taskListId = this.taskListData['task_group_idx'];
    this.taskParentId = this.taskListData['Parent_idx'];
    this.dropdownMenu = [
      {name: '업무 추가', function: this.openAddTaskForm, params: {'content': {}, 'component': this}},
      {name: '업무리스트 삭제', function: this.deleteTaskList, params: {'content': {'project_idx': this.taskParentId, 'task_group_idx': this.taskListId}, 'component': this}},
      {name: '이동', function: this.moveTaskList, params: {'content': {}, 'component': this}}
    ];
    // console.log('taskListData :: ', this.taskListData['Task']);
  }  
  sendTaskId(_taskId){
    this.sendTaskIdEvent.emit(_taskId);
    this.taskId = _taskId;
  }
  deleteTaskList(_obj: any){
    let params: any = _obj['content'],
        _this = _obj['component'];
    _this.dataService.deleteTaskList(params, _this.deleteTaskListComplete, _this);
  }
  deleteTaskListComplete(_data, _this){if(console)  console.log('deleteTaskGroup :: ', _data.msg);}
  changeTaskList(_taskList){
    let newTaskList = {
      'project_idx': this.projectId,
      'task_group_idx': _taskList['task_group_idx'],
      'task_group_name': _taskList['task_group_name'],
      'order_no': _taskList['order_no']
    };
    if(this.firedEnterKeyEvent != true)  this.firedEnterKeyEvent = true;
    if(_taskList['task_group_idx'] != this.taskListTitle)  this.dataService.changeTaskList(newTaskList, this.changeTaskListComplete, this);
  }
  changeDataTaskListName(_taskList){
    if(this.firedEnterKeyEvent == true){
      this.firedEnterKeyEvent = false;
    }else{
      this.changeTaskList(_taskList);
    }
  }
  changeTaskListComplete(_data, _this){if(console)  console.log('changeTaskGroup :: ', _data.msg);}
  moveTaskList(){if(console)  console.log('moveTaskList')}
  openAddTaskForm(_obj: any){
    let _this = _obj['component'];
    _this.isViewAddTaskForm = true;
  }
  addTask(){
    let newTask: any = {
      'project_idx': this.projectId,
      'task_group_idx': this.taskListId,
      'task_name': this.newTaskName,
      'order_no': 110
    };
    this.dataService.addTask(newTask, this.addTaskComplete, this);
  }
  addTaskComplete(_data, _this){
    _this.newTaskName = undefined;
  }
  dateChanged(_e){
    // if(this.data != undefined)  this.data['Last_date'] = _e.formatted;
  }
}