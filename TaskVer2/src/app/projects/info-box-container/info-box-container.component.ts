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
  public currentSnb: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.infoBoxcontents && data.infoBoxcontents.length > 0){
                data.infoBoxcontents.map(infoBoxcontent => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(infoBoxcontent);
                  this.childComponent = this.infoBoxcontents.createComponent(componentFactory); /* ViewChild cache */
                  this.childComponent.instance['projectId'] = this.projectId = this.projectInfoBoxService.getProjectId(); /* 처음 로드된 ViewChild에 projectInfoBoxService를 이용하여 projectId 전달 */
                  this.childComponent.instance['projectName'] = this.projectName = this.projectInfoBoxService.getProjectName(); /* 처음 로드된 ViewChild에 projectInfoBoxService를 이용하여 projectName 전달 */
                  this.childComponent.instance['taskId'] = this.taskId = this.projectInfoBoxService.getTaskId(); /* 처음 로드된 ViewChild에 projectInfoBoxService를 이용하여 taskId 전달 */
                  this.childComponent.instance['taskName'] = this.taskName = this.projectInfoBoxService.getTaskName(); /* 처음 로드된 ViewChild에 projectInfoBoxService를 이용하여 taskName 전달 */
                                                      
                  if(this.projectInfoBoxService.getInfoBoxType() == undefined){ /* 유입 url이 info-box를 포함하는 경우 projectInfoBoxService 통해서 (info-box가 포함된 project-container에) type 전달 */
                    if(this.childComponent.componentType.name == 'ProjectSettingComponent' || this.childComponent.componentType.name == 'ProjectActivityComponent'){
                      this.type = 'project';                     
                    }else if(this.childComponent.componentType.name == 'TaskPropertyComponent' || this.childComponent.componentType.name == 'TaskCommentComponent' || this.childComponent.componentType.name == 'TaskFileComponent'){
                      this.type = 'task';
                    }else{
                      this.type = 'undefined';
                    }
                    this.projectInfoBoxService.setInfoBoxType(this.type);
                  }else if(this.projectInfoBoxService.getInfoBoxType() == 'project'){ /* task페이지 내에서 이벤트 발생시켜 project-info 띄울 때 */
                    this.type = this.projectInfoBoxService.getInfoBoxType();
                  }
                  setTimeout(() => {
                    this.childComponent.instance['data'] = this.projectInfoBoxService.getInfoBoxData(); /* 처음 로드된 ViewChild에 projectInfoBoxService를 이용하여 data 전달 */ 
                  });
                  
                  /* info-box 내에 탭 활성화 컨트롤 */
                  let arrSnb = this.activatedRoute.routeConfig.path.split('/');
                  this.currentSnb = (arrSnb.length > 1) ? '/' + arrSnb[1] : '/' + arrSnb[0];
                  this.projectInfoBoxService.setCurrentSnb(this.currentSnb);
                });
              }
           });
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(projectId 바뀔 때 마다), projectId 전달 */
    this.projectInfoBoxService.getProjectIdEvent.subscribe((_id) => { 
      this.childComponent.instance['projectId'] = this.projectId = this.projectInfoBoxService.getProjectId();
    });    
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(projectName 바뀔 때 마다), projectName 전달 */
    this.projectInfoBoxService.getProjectNameEvent.subscribe((_name) => { 
      this.childComponent.instance['projectName'] = this.projectName = this.projectInfoBoxService.getProjectName();
    }); 
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(taskId 바뀔 때 마다), taskId 전달 */
    this.projectInfoBoxService.getTaskIdEvent.subscribe((_id) => { 
      this.childComponent.instance['taskId'] = this.taskId = this.projectInfoBoxService.getTaskId();
    });
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(taskId 바뀔 때 마다), taskId 전달 */
    this.projectInfoBoxService.getTaskNameEvent.subscribe((_name) => { 
      this.childComponent.instance['taskName'] = this.taskName = this.projectInfoBoxService.getTaskName();
    });    
    /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(data 바뀔 때 마다), data 전달 */
    this.projectInfoBoxService.getInfoBoxDataEvent.subscribe((_data) => { 
      this.childComponent.instance['data'] = this.projectInfoBoxService.getInfoBoxData();
    });
    /* 유입 url이 info-box를 포함하는 경우 projectInfoBoxService 통해서 (info-box가 포함된 project-container에) projectId 전달 */
    if(this.activatedRoute.snapshot.params['projectId']){ /* type이 'project'일 때 */
      this.projectInfoBoxService.setProjectId(Number(this.activatedRoute.snapshot.params['projectId']));
    }else{ /* type이 'task'일 때 */
    }
    /* 유입 url이 info-box를 포함하는 경우 projectInfoBoxService 통해서 (info-box가 포함된 project-container에) taskId 전달 */
    if(this.activatedRoute.snapshot.params['taskId']){this.projectInfoBoxService.setTaskId(Number(this.activatedRoute.snapshot.params['taskId']));}
  }  
}
