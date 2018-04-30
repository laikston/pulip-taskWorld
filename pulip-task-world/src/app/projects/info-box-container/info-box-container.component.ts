import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-info-box-container',
  templateUrl: './info-box-container.component.html',
  styleUrls: ['./info-box-container.component.css']
})
export class InfoBoxContainerComponent implements OnInit {
  @ViewChild('infoBoxcontents', { read: ViewContainerRef }) public infoBoxcontents: ViewContainerRef;
  public childComponent: ComponentRef<any>;
  public projectId: number;
  public projectName: string;
  public taskId: number;
  public taskName: string;
  public type: string;
  public data: any;
  public currentSnb: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.type = this.projectInfoBoxService.getInfoBoxType();
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.infoBoxcontents && data.infoBoxcontents.length > 0){
                data.infoBoxcontents.map(infoBoxcontent => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(infoBoxcontent);
                  this.childComponent = this.infoBoxcontents.createComponent(componentFactory);                                
                  
                  /* 유입 url이 info-box를 포함하는 경우 type, projectId, taskId 저장 */
                  if(!this.projectInfoBoxService.getInfoBoxType()){ 
                    if(this.childComponent.componentType.name == 'ProjectSettingComponent' || this.childComponent.componentType.name == 'ProjectActivityComponent'){
                      this.type = 'project';   
                      this.projectInfoBoxService.setProjectId(this.activatedRoute.snapshot.params.projectId);
                    }else if(this.childComponent.componentType.name == 'TaskPropertyComponent' || this.childComponent.componentType.name == 'TaskCommentComponent' || this.childComponent.componentType.name == 'TaskFileComponent'){
                      this.type = 'task';
                      this.projectInfoBoxService.setTaskId(Number(this.activatedRoute.snapshot.params.taskId));
                    }else{
                      this.type = 'undefined';
                    }
                    this.projectInfoBoxService.setInfoBoxType(this.type);                    
                    
                  /* task페이지 내에서 이벤트 발생시켜 project-info 띄울 때 */
                  }else if(this.projectInfoBoxService.getInfoBoxType() == 'project'){ 
                    this.type = this.projectInfoBoxService.getInfoBoxType();
                    this.projectId = this.projectInfoBoxService.getProjectId();
                    this.taskId = this.projectInfoBoxService.getTaskId();
                  }

                  /* history back */
                  if(this.activatedRoute.snapshot.params){
                    this.type = 'project';
                    this.projectInfoBoxService.setInfoBoxType(this.type);
                    if(this.activatedRoute.snapshot.params.taskId){
                      this.type = 'task';
                      this.projectInfoBoxService.setInfoBoxType(this.type);
                      this.projectInfoBoxService.setTaskId(this.activatedRoute.snapshot.params.taskId);
                    }
                  }                  

                  /* 처음 로드된 ViewChild에 projectId, taskId 전달 */
                  this.childComponent.instance['projectId'] = this.projectId = this.projectInfoBoxService.getProjectId();
                  this.childComponent.instance['taskId'] = this.taskId = this.projectInfoBoxService.getTaskId();
                  
                  /* type에 따른 data 지정 */
                  setTimeout(() => {
                    if(this.type == 'project'){
                      this.childComponent.instance['data'] = this.data = this.projectInfoBoxService.getProjectData();
                      console.log(this.data)
                    }else if(this.type == 'task'){
                      this.childComponent.instance['data'] = this.data = this.projectInfoBoxService.getTaskData();                      
                    }else{
                      this.childComponent.instance['data'] = this.data = undefined;
                    }
                  });    

                  /* info-box 내에 탭 활성화 컨트롤 */
                  let arrSnb = this.activatedRoute.routeConfig.path.split('/');
                  this.currentSnb = (arrSnb.length > 1) ? '/' + arrSnb[1] : '/' + arrSnb[0];
                  this.projectInfoBoxService.setCurrentSnb(this.currentSnb);
                });
              }
           });
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(projectId 바뀔 때 마다), projectId, data 세팅 */
    this.projectInfoBoxService.getProjectIdEvent.subscribe((_id) => { 
      this.childComponent.instance['projectId'] = this.projectId = this.projectInfoBoxService.getProjectId();
      // this.childComponent.instance['data'] = this.projectInfoBoxService.getProjectData();
    });  
    this.projectInfoBoxService.getProjectDataEvent.subscribe((_data) => { 
      if(this.type == 'project')  this.childComponent.instance['data'] = this.projectInfoBoxService.getProjectData();
    });
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(taskId 바뀔 때 마다), taskId, data 세팅 */
    this.projectInfoBoxService.getTaskIdEvent.subscribe((_id) => { 
      this.childComponent.instance['taskId'] = this.taskId = this.projectInfoBoxService.getTaskId();
      //this.childComponent.instance['data'] = this.projectInfoBoxService.getTaskData();
    });
    this.projectInfoBoxService.getTaskDataEvent.subscribe((_data) => { 
      if(this.type == 'task')  this.childComponent.instance['data'] = this.projectInfoBoxService.getTaskData();
    });
  }  
}
