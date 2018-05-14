import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

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
  public taskListDatas: TaskListBox[] = [
    {
      "Idx": 1,
      "Name": "태스크 리스트1",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 2,
      "Reg_date": "2018-02-12",
      "Last_date": "2018-03-12",
      "Task": [
        {
          "Idx": 1, 
          "Name":"태스크 리스트1 태스크1", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":2, 
          "Writer":"안정화",
          "Write_date":"2018-02-12",
          "Start_date":"2018-03-22", 
          "End_date":"2018-03-30", 
          "Complete":"N", 
          "Reg_date":"2018-02-12", 
          "Last_date":"2018-04-20", 
          "AssiMember":[], 
          "Tag":[], 
          "File":[], 
          "CheckList":[],
          "Content":"태스크 리스트1 태스크1 Content"
        },
        {
          "Idx": 2, 
          "Name":"태스크 리스트1 태스크2", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":3, 
          "Writer":"안정화",
          "Write_date":"2018-04-12",
          "Start_date":"2018-04-12", 
          "End_date":"2018-06-30", 
          "Complete":"Y", 
          "Reg_date":"2018-04-12", 
          "Last_date":"2018-06-30", 
          "AssiMember":[
            {
              "Idx":100, 
              "User_idx":999, 
              "Task_idx":3
            }, 
            {
              "Idx":101, 
              "User_idx":888, 
              "Task_idx":3
            }
          ], 
          "Tag":[], 
          "File":[], 
          "CheckList":[
            {
              "Idx":4, 
              "Parent_idx":2, // 추가
              "Name":"프로젝트리스트 쿼리, 프로젝트리스트 쿼리", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-03-12", 
              "Last_date":"2017-06-30"
            },
            {
              "Idx":5, 
              "Parent_idx":2, // 추가
              "Name":"프로젝트리스트, 프로젝트리스트 쿼리", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-03-15", 
              "Last_date":"2017-05-12"
            }
          ],
          "Content":"태스크 리스트1 태스크2 Content"
        },
        {
          "Idx": 3, 
          "Name":"태스크 리스트1 태스크3", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":1, 
          "Writer":"안정화",
          "Write_date":"2018-05-12",
          "Start_date":"2018-05-12", 
          "End_date":"2018-06-30", 
          "Complete":"N", 
          "Reg_date":"2018-06-12", 
          "Last_date":"2018-07-12", 
          "AssiMember":[], 
          "Tag":[], 
          "File":[], 
          "CheckList":[
            {
              "Idx":1, 
              "Parent_idx":3, // 추가
              "Name":"2018-06-12", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-06-02", 
              "Last_date":"2018-06-12"
            },
            {
              "Idx":2, 
              "Parent_idx":3, // 추가
              "Name":"2017-12-2", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-06-05", 
              "Last_date":"2018-06-22"
            },
            {
              "Idx":3, 
              "Parent_idx":3, // 추가
              "Name":"33333333333", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-06-12", 
              "Last_date":"2018-06-20"
            },
            {
              "Idx":4, 
              "Parent_idx":3, // 추가
              "Name":"2018-12-12", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-06-10", 
              "Last_date":"2017-07-25"
            },
            {
              "Idx":6, 
              "Parent_idx":3, // 추가
              "Name":"프2017-12-2", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-06-15", 
              "Last_date":"2018-06-20"
            },
            {
              "Idx":5, 
              "Parent_idx":3, // 추가
              "Name":"133333333333", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-06-18", 
              "Last_date":"2017-06-20"
            }
          ],
          "Content":"태스크 리스트1 태스크3 Content"
        }
      ]
    },
    {
      "Idx": 2,
      "Name": "태스크 리스트2",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 1,
      "Reg_date": "2018-12-12",
      "Last_date": "2018-12-12",
      "Task": [
        {
          "Idx": 4, 
          "Name":"태스크 리스트2 태스크1", 
          "Parent_idx":2, 
          "Level":2, 
          "Order":3, 
          "Writer":"안정화",
          "Write_date":"2018-12-12",
          "Start_date":"2018-12-12", 
          "End_date":"2018-12-30", 
          "Complete":"N", 
          "Reg_date":"2018-12-12", 
          "Last_date":"2018-12-12", 
          "AssiMember":[], 
          "Tag":[], 
          "File":[], 
          "CheckList":[],
          "Content":"태스크 리스트2 태스크1 Content"
        },
        {
          "Idx": 5, 
          "Name":"태스크 리스트2 태스크2", 
          "Parent_idx":2, 
          "Level":2, 
          "Order":1, 
          "Writer":"안정화2",
          "Write_date":"2018-12-12",
          "Start_date":"2018-12-22", 
          "End_date":"2018-12-3022", 
          "Complete":"N", 
          "Reg_date":"2018-12-12", 
          "Last_date":"2018-12-22", 
          "AssiMember":[
            {
              "Idx":100, 
              "User_idx":999, 
              "Task_idx":3
            }, 
            {
              "Idx":101, 
              "User_idx":888, 
              "Task_idx":3
            }
          ], 
          "Tag":[], 
          "File":[], 
          "CheckList":[
            {
              "Idx":4, 
              "Parent_idx":5, // 추가
              "Name":"프로젝트리스트 쿼리 454545", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-1212"
            },
            {
              "Idx":5, 
              "Parent_idx":5, // 추가
              "Name":"프로젝트리스트 쿼리2", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-12"
            }
          ],
          "Content":"태스크 리스트2 태스크2 Content"
        },
        {
          "Idx": 6, 
          "Name":"태스크 리스트2 태스크3", 
          "Parent_idx":2, 
          "Level":2, 
          "Order":2, 
          "Writer":"안정화",
          "Write_date":"2018-12-12",
          "Start_date":"2018-12-12", 
          "End_date":"2018-12-30", 
          "Complete":"Y", 
          "Reg_date":"2018-06-12", 
          "Last_date":"2018-12-12", 
          "AssiMember":[], 
          "Tag":[], 
          "File":[], 
          "CheckList":[
            {
              "Idx":1, 
              "Parent_idx":6, // 추가
              "Name":"프로젝트리스트 쿼리 1212", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            }
          ],
          "Content":"태스크 리스트2 태스크3 Content"
        }
      ]
    },
    {
      "Idx": 7,
      "Name": "태스크7 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 3,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 8,
      "Name": "태스크8 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 4,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 9,
      "Name": "태스크9 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 5,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 10,
      "Name": "태스크10 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 6,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 11,
      "Name": "태스크11 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 7,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 16,
      "Name": "태스크16 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 8,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 17,
      "Name": "태스크17 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 9,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 18,
      "Name": "태스크18 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 10,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    },
    {
      "Idx": 19,
      "Name": "태스크19 test",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 11,
      "Reg_date": "2018-04-24",
      "Last_date": "2018-04-24",
      "Task": []
    }
  ];
  // public taskListDatas: TaskListBox[] = [];
  public isAddList: boolean = false;
  public order: string = "Order";
  public ascending: boolean = true;    
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private location: PlatformLocation,
    private constantService: ConstantService,
    private dataService: DataService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.projectId = this.projectInfoBoxService.getProjectId();
    this.projectData = this.projectInfoBoxService.getProjectData();
    if(!this.projectId){ // 유입 url info-box 포함일 때
      this.projectId = Number(this.activatedRoute.snapshot.params.projectId);
      this.projectInfoBoxService.setProjectId(this.projectId);
      this.dataService.getProjectList({}, this.setProjectData, this); 
    }else{
      setTimeout(() => { this.init(); });
    }    
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
  }
  setProjectData(_data, _this){
    _this.projectData = _this.projectInfoBoxService.filterProjectData(_data, Number(_this.projectId));
    _this.projectInfoBoxService.setProjectListData(_data);
    _this.setTaskData();
  }
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
      'task_group_name': undefined,
      'projectid': this.projectId,
      'order_no': undefined,
      'memberidx': 31321
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
    setTimeout(() => { // socket으로 받기
      let newTaskList: any = { // dummy
        'Idx': 3,
        'Name': _this.newTaskList['task_group_name'],
        'Parent_idx': _this.newTaskList['projectid'],
        'Level': undefined,
        'Order': 3,
        'Reg_date': undefined,
        'Last_date': undefined,
        'Task': []
      },
      element: HTMLElement = document.getElementById('closeTaskListInputBtn') as HTMLElement;
      _this.taskListDatas.push(newTaskList);
      _this.initNewTaskList();
      element.click();
    });
  }
  changeTaskListData(_e){
    console.log(_e)
  }
  transferDataSuccess(_e){
    console.log(_e)
  }
}