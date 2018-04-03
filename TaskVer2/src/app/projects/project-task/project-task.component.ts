import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

export class check{
  id: number;
  title: string;
  complete: boolean;
}
export class task{
  id: number;
  title: string;
  manager: string;
  checkList: check[];
}
export class taskGroup{
  id: number;
  title: string;
  taskList: task[];
}
@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {
  @Output()  infoBoxPropEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  snbEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  gnbTitle: string = 'projects';
  snbTitle: string = 'task';
  url: string;
  projectId: number = null;
  taskId: number;
  data: taskGroup[] = [
    { 
      id: 1,
      title: '분석/설계/세팅',
      taskList: [
        {
          id: 1001,
          title: '서버 세팅',
          manager: '김종환',
          checkList: [
            {
              id: 100101,
              title: '서버세팅 체크1',
              complete: false
            }
          ]
        },
        {
          id: 1002,
          title: 'DB분석및 설계',
          manager: '김종환',
          checkList: [
            {
              id: 100201,
              title: '프로젝트리스트 쿼리',
              complete: false
            },
            {
              id: 100202,
              title: '프로젝트리스트 쿼리2',
              complete: false
            }
          ]
        }
      ]
    },
    { 
      id: 2,
      title: '클라이언트 개발',
      taskList: [
        {
          id: 2001,
          title: '프로젝트 리스트화면 개발',
          manager: '김은주',
          checkList: [
            {
              id: 200101,
              title: '캘린더 플러그인찾기',
              complete: false
            },
            {
              id: 200101,
              title: '드레그인드랍 플로그인찾기',
              complete: false
            }
          ]
        },
        {
          id: 2002,
          title: '업무화면 개발1',
          manager: 'ㅈㅈㅈ',
          checkList: [
            {
              id: 200201,
              title: 'nested router 구조잡기',
              complete: false
            }
          ]
        }
      ]
    },
    { 
      id: 3,
      title: '서버개발',
      taskList: [
        {
          id: 3001,
          title: '업무화면  API',
          manager: '김종환',
          checkList: [
            {
              id: 300101,
              title: '서버개발 체크1',
              complete: false
            }
          ]
        },
        {
          id: 3002,
          title: 'socket로직 개발',
          manager: '김종환',
          checkList: [
            {
              id: 300201,
              title: 'socket로직 개발 체크1',
              complete: false
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
