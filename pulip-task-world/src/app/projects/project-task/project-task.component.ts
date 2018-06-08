import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { SocketService } from '../../service/socket.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectTaskComponent implements OnInit, OnDestroy {
  @ViewChild('taskListName')  public taskListName: ElementRef;
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  @Output()  public setInfoBoxDataEvent: EventEmitter<any> = new EventEmitter<any>();
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'task';
  public url: string;
  public projectId: number;
  public projectData: any;
  public taskId: number;
  public taskListId: number;
  public taskData: any;
  public type: string;
  public isCancel: boolean = false;
  public newTaskList: any = {};
  public newTask: any = {
    'task_group_idx': undefined,
    'Task_name': undefined,
    'Order_no': undefined,
    'memberidx': 31321
  };
  public taskListDatas: TaskListBox[] = [];
  public isAddList: boolean = false;
  public order: string = "order_no";
  public ascending: boolean = true;    
  public memberId: string;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private location: PlatformLocation,
    private constantService: ConstantService,
    private dataService: DataService,
    private projectInfoBoxService: ProjectInfoBoxService,
    private socketService: SocketService,
    private loginService: LoginService
  ) { }
  ngOnInit() {
    this.projectId = this.projectInfoBoxService.getProjectId();    
    this.projectData = this.projectInfoBoxService.getProjectData();
    this.memberId = this.loginService.getMemberId();
    if(!this.projectId){  
      this.projectId = Number(this.activatedRoute.snapshot.params.projectId);
      this.projectInfoBoxService.setProjectId(this.projectId);
      this.dataService.getProjectList({'memberid': this.memberId}, this.setProjectData, this); 
    }else{ // projectList 타고 들어갈 때
      setTimeout(() => { this.init(); });
    } 
    this.dataService.getTaskList({'projectid': this.projectId}, this.setTaskListData, this);

    this.location.onPopState(() => { /* history back */
      this.type = undefined;
      this.projectInfoBoxService.setInfoBoxType(this.type);            
      setTimeout(() => { 
        this.type = this.projectInfoBoxService.getInfoBoxType();
        this.init(); 
      });
    });
    this.snbEvent.emit(this.snbTitle);
    this.url = this.constantService.getLinkUrl(this.gnbTitle);         
    this.initNewTaskList();
    this.connectSocketServer();
  }
  setProjectData(_data, _this){
    _this.projectData = _this.projectInfoBoxService.filterProjectData(_data, Number(_this.projectId));
    _this.projectInfoBoxService.setProjectListData(_data);
    _this.setTaskData();
  }
  setTaskListData(_data, _this){
    let element: HTMLElement = document.querySelector('.updateView') as HTMLElement;
    _this.taskListDatas = _data;
    element.click();
  }
  updateView(){}
  setTaskData(){
    this.type = this.projectInfoBoxService.getInfoBoxType();
    if(this.type == 'task'){
      this.taskId = this.projectInfoBoxService.getTaskId();
      this.taskData = this.projectInfoBoxService.filterTaskData(this.taskListDatas, this.type, this.projectId, this.taskId);    
      this.taskListId = this.taskData['Parent_idx'];    
      this.projectInfoBoxService.setTaskListId(this.taskListId);
    }   
    this.init();
  }
  ngOnDestroy(){ 
    this.socketService.close();
    window.removeEventListener('popstate', () => { /* history back event destroyed */
      this.type = undefined;
      this.projectInfoBoxService.setInfoBoxType(this.type);            
      setTimeout(() => { 
        this.type = this.projectInfoBoxService.getInfoBoxType();
        this.init(); 
      });
    });
  }
  init(){
    let viewInfo: boolean, prop: any = {}, data: TaskListBox;     
    if(this.type == undefined){ /* 유입 url가 info-box 비활성 */  
      viewInfo = false;  
    }else{ /* 유입 url가 info-box 활성 */  
      viewInfo = true;
      data = (this.type == 'project') ? this.projectData : this.taskData ;      
    }
    this.setInfoBoxDataEvent.emit(data);
    this.infoBoxPropEvent.emit(this.infoBoxEvent(viewInfo, data));
  }
  goTaskDetail(_taskId: number){
    let infoBoxProp: any = {}, url: any, goTitle: string = 'property';
    this.taskId = _taskId;
    this.type = 'task';    
    this.taskData = this.projectInfoBoxService.filterTaskData(this.taskListDatas, this.type, this.projectId, this.taskId);
    this.taskListId = this.taskData['Parent_idx'];
    this.projectInfoBoxService.setTaskListId(this.taskListId);
    this.setInfoBoxDataEvent.emit(this.taskData);    
    infoBoxProp = this.infoBoxEvent(true, this.taskData);
    this.infoBoxPropEvent.emit(infoBoxProp);      
    this.projectInfoBoxService.setTaskId(this.taskId);
    this.projectInfoBoxService.setInfoBoxType(this.type);    
    
    url = this.url['base'] + this.url[this.snbTitle] + infoBoxProp.projectId + this.url['taskDetail'] + infoBoxProp.taskId + '/' + goTitle;   
    this.router.navigate([url]); 
  }  
  private infoBoxEvent(_isView, _data){
    let infoBoxProp: any = {
      projectId: this.projectId,

      type: this.type,
      taskId: this.taskId,
      infoBoxData: _data,
      viewInfo: _isView
    };
    return infoBoxProp;    
  }
  private initNewTaskList(){
    this.newTaskList = {
      'project_idx': this.projectId,
      'task_group_name': undefined,      
      'order_no': undefined,
      'member_idx' : 31321
    };
  }
  openAddTaskListInput(_e){    
    if(this.isCancel == false){
      this.isAddList = true;
      setTimeout(() => this.taskListName.nativeElement.focus(), 0);
    }
  }
  cancelAddTaskListInput(){  
    this.isCancel = true;
    this.isAddList = false;     
    this.newTaskList['task_group_name'] = undefined;
    setTimeout(() => this.isCancel = false, 100);
  }
  addTaskList(){
    if(this.newTaskList['task_group_name'] == undefined){
      this.isAddList = false;
    }else{
      this.dataService.addTaskList(this.newTaskList, this.addTaskListComplete, this);
    }
  }
  addTaskListComplete(_data, _this){
    let element: HTMLElement = document.querySelector('#closeTaskListInputBtn') as HTMLElement;
    element.click();
    if(console)  console.log('addTaskGroup :: ', _data.msg);
  }
  hideAddTaskListForm(_groupname){
    let element: HTMLElement;
    if(!_groupname){
      element = document.querySelector('#closeTaskListInputBtn') as HTMLElement;
      element.click();
    }
  }
  connectSocketServer(){
    this.socketService.open(this.projectId);
    this.socketService.getData().subscribe(event => {
      let data: Array<any>, element: HTMLElement;
      switch(event.type){
        case 'message' :
          data = event.data;
          this.taskListDatas = data;          
          if(this.type == 'task' && this.taskId != undefined){
            this.taskData = this.projectInfoBoxService.filterTaskData(this.taskListDatas, this.type, this.projectId, this.taskId);
            this.setInfoBoxDataEvent.emit(this.taskData);
            this.infoBoxPropEvent.emit(this.infoBoxEvent(true, this.taskData));
          }
          element = document.querySelector('.updateView') as HTMLElement;
          this.initNewTaskList();
          element.click();
          console.log('socket message :: ', data);
          break;

        case 'open' :
          break;

        case 'close' :
          break;

        default :
          break;
      }
    });
  }
  changeTaskListData(_e){
    console.log(_e)
  }
  transferDataSuccess(_e){
    console.log(_e)
  }
}