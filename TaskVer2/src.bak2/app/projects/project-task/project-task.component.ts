import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'task';
  public url: string;
  public projectId: number = null;
  public taskId: number;
  public taskListDatas: TaskListBox[] = [
    {
      "Idx": 1,
      "Name": "분석/설계/세팅",
      "Parent_idx": 0,
      "Level": 1,
      "Order": 1,
      "Reg_date": "2018-12-12",
      "Last_date": "2018-12-12",
      "Task": [
        {
          "Idx": 2, 
          "Name":"서버 세팅1", 
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
          "Idx": 3, 
          "Name":"DB분석및 설계1", 
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
              "Complete":"N", 
              "Reg_date":"2018-12-12", 
              "Last_date":"2017-1212"
            }
          ]
        },
        {
          "Idx": 5, 
          "Name":"개발환경 세팅1", 
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
              "Idx":4, 
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
    },
    {
      "Idx": 2,
      "Name": "분석/설계/세팅2",
      "Parent_idx": 0,
      "Level": 1,
      "Order": 1,
      "Reg_date": "2018-12-12",
      "Last_date": "2018-12-12",
      "Task": [
        {
          "Idx": 2, 
          "Name":"서버 세팅2", 
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
          "Idx": 3, 
          "Name":"DB분석및 설계2", 
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
              "Complete":"N", 
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
          "Idx": 5, 
          "Name":"개발환경 세팅2", 
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
              "Idx":4, 
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
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.snbEvent.emit(this.snbTitle);
    this.url = this.constantService.getLinkUrl(this.gnbTitle); 
    setTimeout(() => {     
      /* 유입 url가 task detail info-box 비활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      let prop: any = { 
        projectId : this.activatedRoute.snapshot.params.projectId,
        type : this.projectInfoBoxService.getInfoBoxType(),
        taskId : undefined,
        viewInfo : false
      };
      this.projectId = this.activatedRoute.snapshot.params.projectId;
      /* 유입 url가 task detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.projectInfoBoxService.getInfoBoxType() == 'task'){
        this.projectInfoBoxService.setProjectId(this.projectId);
        this.taskId = this.projectInfoBoxService.getTaskId();
        prop.taskId = this.projectInfoBoxService.getTaskId();
        prop.viewInfo = true;
      }
      /* 유입 url가 project detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.projectInfoBoxService.getInfoBoxType() == 'project'){
        this.projectInfoBoxService.setProjectId(this.projectId);
        this.taskId = this.projectInfoBoxService.getTaskId();
        prop.taskId = this.projectInfoBoxService.getTaskId();
        prop.viewInfo = true;
      }
      this.infoBoxPropEvent.emit(prop);
    });
  }
  goTaskDetail(_taskId){
    let infoBoxProp: any = {}, url: any, goTitle: string = 'property';
    this.taskId = _taskId;
    infoBoxProp = {
      type: 'task',
      projectId: this.projectId,
      taskId: this.taskId,
      viewInfo: true
    };
    this.infoBoxPropEvent.emit(infoBoxProp);  
    url = this.url['base'] + this.url[this.snbTitle] + this.projectId + this.url['taskDetail'] +  _taskId + '/' + goTitle;   
    this.router.navigate([url]); 
  }  
}
