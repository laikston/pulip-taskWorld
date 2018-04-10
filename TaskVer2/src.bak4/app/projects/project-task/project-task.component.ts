import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  @Output()  public setInfoBoxDataEvent: EventEmitter<any> = new EventEmitter<any>();
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'task';
  public url: string;
  public projectId: number = null;
  public projectName: string;
  public taskId: number;
  public taskName: string;
  public type: string;
  public taskListDatas: TaskListBox[] = [
    {
      "Idx": 1,
      "Name": "태스크 리스트1",
      "Parent_idx": 3080,
      "Level": 1,
      "Order": 1,
      "Reg_date": "2018-12-12",
      "Last_date": "2018-12-12",
      "Task": [
        {
          "Idx": 1, 
          "Name":"태스크 리스트1 태스크1", 
          "Parent_idx":1, 
          "Level":2, 
          "Order":1, 
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
          "Order":1, 
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
          "Parent_idx":1, 
          "Level":2, 
          "Order":1, 
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
          "Parent_idx":1, 
          "Level":2, 
          "Order":1, 
          "Start_date":"2018-12-12", 
          "End_date":"2018-12-30", 
          "Complete":"N", 
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
              "Name":"프로젝트리스트 쿼리", 
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
          "Parent_idx":1, 
          "Level":2, 
          "Order":1, 
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
              "Name":"프로젝트리스트 쿼리", 
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
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private constantService: ConstantService,
    private dataService: DataService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.snbEvent.emit(this.snbTitle);
    this.url = this.constantService.getLinkUrl(this.gnbTitle); 

    /* 유입 url이 project-list를 통과하지 않을 때 */
    if(!this.projectInfoBoxService.getProjectName()){
      this.dataService.getProjectList({}, this.setProjectName, this);
    }else{
      this.projectName = this.projectInfoBoxService.getProjectName();
    }

    setTimeout(() => {     
      this.init();     
    });
  }
  init(){
    let prop: any, data: TaskListBox;
      this.type = this.projectInfoBoxService.getInfoBoxType();       
      
      /* 유입 url가 task detail info-box 비활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      prop = { 
        projectId : this.activatedRoute.snapshot.params.projectId,
        projectName : this.projectName,
        type : this.type,
        taskId : undefined,
        taskName : undefined,
        viewInfo : false
      };
      this.projectId = this.activatedRoute.snapshot.params.projectId;
      
      /* 유입 url가 project/task detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.type != undefined){
        data = this.projectInfoBoxService.filterInfoBoxData(this.taskListDatas, prop.type, this.projectId, this.taskId);
        this.projectInfoBoxService.setProjectId(this.projectId);
        this.taskId = prop.taskId = this.projectInfoBoxService.getTaskId();
        prop.viewInfo = true;
        if(!this.projectInfoBoxService.getTaskName()){
          if(data)  this.taskName = prop.taskName = data.Name;
        }
      }
      this.projectInfoBoxService.setInfoBoxData(data);
      this.setInfoBoxDataEvent.emit(this.projectInfoBoxService.getInfoBoxData());
      this.infoBoxPropEvent.emit(prop); 
  }
  setProjectName(_data, _this){
    _data.forEach((value: any, key: number) => {
      if(value.projectid == Number(_this.activatedRoute.snapshot.params.projectId)){
        _this.projectName = value.projectname;
        _this.projectInfoBoxService.setProjectName(value.projectname);
        _this.init();
      }
    });
  }
  goTaskDetail(_taskProp){
    let infoBoxProp: any = {}, url: any, goTitle: string = 'property';
    this.taskId = _taskProp.id;
    this.taskName = _taskProp.name;
    infoBoxProp = {
      type: 'task',
      projectId: this.projectId,
      projectName : this.projectName,
      taskId: this.taskId,
      taskName: this.taskName,
      viewInfo: true
    };
    this.infoBoxPropEvent.emit(infoBoxProp);      
    this.projectInfoBoxService.setInfoBoxData(this.projectInfoBoxService.filterInfoBoxData(this.taskListDatas, infoBoxProp.type, infoBoxProp.projectId, infoBoxProp.taskId));
    this.setInfoBoxDataEvent.emit(this.projectInfoBoxService.getInfoBoxData());
    url = this.url['base'] + this.url[this.snbTitle] + infoBoxProp.projectId + this.url['taskDetail'] + infoBoxProp.taskId + '/' + goTitle;   
    this.router.navigate([url]); 
  }  
}