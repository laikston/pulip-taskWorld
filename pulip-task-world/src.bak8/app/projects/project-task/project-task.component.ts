import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit, OnDestroy {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  @Output()  public setInfoBoxDataEvent: EventEmitter<any> = new EventEmitter<any>();
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'task';
  public url: string;
  public projectId: number;
  public projectData: any;
  public taskId: number;
  public taskData: any;
  public type: string;
  public taskListDatas: TaskListBox[] = [
    {
      "Idx": 1,
      "Name": "태스크 리스트1",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 2,
      "Reg_date": "2018-12-12",
      "Last_date": "2018-12-12",
      "Task": [
        {
          "Idx": 1, 
          "Name":"태스크 리스트1 태스크1", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":2, 
          "Writer":"안정화",
          "Write_date":"2018-12-12",
          "Start_date":"2018-12-12", 
          "End_date":"2018-12-30", 
          "Complete":"N", 
          "Reg_date":"2018-12-12", 
          "Last_date":"2018-12-20", 
          "AssiMember":[], 
          "Tag":[], 
          "File":[], 
          "CheckList":[]
        },
        {
          "Idx": 2, 
          "Name":"태스크 리스트1 태스크2", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":3, 
          "Writer":"안정화",
          "Write_date":"2018-12-12",
          "Start_date":"2018-12-12", 
          "End_date":"2018-12-30", 
          "Complete":"Y", 
          "Reg_date":"2018-12-12", 
          "Last_date":"2018-12-12", 
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
              "Name":"프로젝트리스트 쿼리, 프로젝트리스트 쿼리", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-1212"
            },
            {
              "Idx":5, 
              "Name":"프로젝트리스트, 프로젝트리스트 쿼리", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-1212"
            }
          ]
        },
        {
          "Idx": 3, 
          "Name":"태스크 리스트1 태스크3", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":1, 
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
          "CheckList":[
            {
              "Idx":1, 
              "Name":"프로젝트리스트 쿼리 2018-12-12", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            },
            {
              "Idx":2, 
              "Name":"프로젝트리스트 쿼리 2017-12-2", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            },
            {
              "Idx":3, 
              "Name":"프로젝트리스트 쿼리 33333333333", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            },
            {
              "Idx":4, 
              "Name":"프로젝트리스트 쿼리 2018-12-12", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            },
            {
              "Idx":6, 
              "Name":"프로젝트리스트 쿼리 2017-12-2", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            },
            {
              "Idx":5, 
              "Name":"프로젝트리스트 쿼리 33333333333", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            }
          ]
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
          "CheckList":[]
        },
        {
          "Idx": 5, 
          "Name":"태스크 리스트2 태스크2", 
          "Parent_idx":2, 
          "Level":2, 
          "Order":1, 
          "Writer":"안정화2",
          "Write_date":"2018-12-1222",
          "Start_date":"2018-12-1222", 
          "End_date":"2018-12-3022", 
          "Complete":"N", 
          "Reg_date":"2018-12-1222", 
          "Last_date":"2018-12-1222", 
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
              "Name":"프로젝트리스트 쿼리 454545", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-1212"
            },
            {
              "Idx":5, 
              "Name":"프로젝트리스트 쿼리2", 
              "Level":3, 
              "Order":1, 
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-1212"
            }
          ]
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
          "Reg_date":"2018-12-12", 
          "Last_date":"2018-12-12", 
          "AssiMember":[], 
          "Tag":[], 
          "File":[], 
          "CheckList":[
            {
              "Idx":1, 
              "Name":"프로젝트리스트 쿼리 1212", 
              "Level":3, 
              "Order":1, 
              "Complete":"Y", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-12-2"
            }
          ]
        }
      ]
    }
  ];
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
  }
  setProjectData(_data, _this){
    _this.projectData = _this.projectInfoBoxService.filterProjectData(_data, Number(_this.projectId));
    _this.setTaskData();
  }
  setTaskData(){
    this.type = this.projectInfoBoxService.getInfoBoxType();
    if(this.type == 'task'){
      this.taskId = this.projectInfoBoxService.getTaskId();
      this.taskData = this.projectInfoBoxService.filterTaskData(this.taskListDatas, this.type, this.projectId, this.taskId);        
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
    prop = { 
      projectId : this.projectId,
      infoBoxData : data,
      type : this.type,
      taskId : this.taskId,
      viewInfo : viewInfo
    };
    this.setInfoBoxDataEvent.emit(data);
    this.infoBoxPropEvent.emit(prop);
  }
  goTaskDetail(_taskId: number){
    let infoBoxProp: any = {}, url: any, goTitle: string = 'property';
    this.taskId = _taskId;
    this.type = 'task';
    this.taskData = this.projectInfoBoxService.filterTaskData(this.taskListDatas, this.type, this.projectId, this.taskId);
    infoBoxProp = {
      projectId: this.projectId,
      type: this.type,
      taskId: this.taskId,
      infoBoxData: this.taskData,
      viewInfo: true
    };
    this.infoBoxPropEvent.emit(infoBoxProp);      
    this.projectInfoBoxService.setTaskId(this.taskId);
    this.projectInfoBoxService.setInfoBoxType(this.type);
    this.setInfoBoxDataEvent.emit(this.taskData);    
    
    url = this.url['base'] + this.url[this.snbTitle] + infoBoxProp.projectId + this.url['taskDetail'] + infoBoxProp.taskId + '/' + goTitle;   
    this.router.navigate([url]); 
  }  
}