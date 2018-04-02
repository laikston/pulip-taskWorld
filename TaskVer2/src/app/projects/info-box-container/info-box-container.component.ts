import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-info-box-container',
  templateUrl: './info-box-container.component.html',
  styleUrls: ['./info-box-container.component.css']
})
export class InfoBoxContainerComponent implements OnInit {
  @ViewChild('infoBoxcontents', { read: ViewContainerRef }) infoBoxcontents: ViewContainerRef;
  childComponent:ComponentRef<any>;
  projectId:number;
  taskId:number;
  type:string;
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
                  this.childComponent.instance['taskId'] = this.taskId = this.projectInfoBoxService.getTaskId(); /* 처음 로드된 ViewChild에 projectInfoBoxService를 이용하여 taskId 전달 */

                  /* 유입 url이 info-box를 포함하는 경우 projectInfoBoxService 통해서 (info-box가 포함된 project-container에) type 전달 */
                  if(this.projectInfoBoxService.getInfoBoxType() == undefined){
                    if(this.childComponent.componentType.name == 'ProjectSettingComponent' || this.childComponent.componentType.name == 'ProjectActivityComponent'){
                      this.type = 'project';                     
                    }else if(this.childComponent.componentType.name == 'TaskPropertyComponent' || this.childComponent.componentType.name == 'TaskCommentComponent' || this.childComponent.componentType.name == 'TaskFileComponent'){
                      this.type = 'task';
                    }else{
                      this.type = 'undefined';
                    }
                    this.projectInfoBoxService.setInfoBoxType(this.type);
                  }
                });
              }
           });

    this.projectInfoBoxService.getProjectIdEvent.subscribe((_id) => { /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(projectId 바뀔 때 마다), projectId 전달 */
      this.childComponent.instance['projectId'] = this.projectId = this.projectInfoBoxService.getProjectId();
    });    
    this.projectInfoBoxService.getTaskIdEvent.subscribe((_id) => { /* 이미 로드된 ViewChild에 projectInfoBoxService를 이용(taskId 바뀔 때 마다), taskId 전달 */
      this.childComponent.instance['taskId'] = this.taskId = this.projectInfoBoxService.getTaskId();
    });

    /* 유입 url이 info-box를 포함하는 경우 projectInfoBoxService 통해서 (info-box가 포함된 project-container에) projectId 전달 */
    if(this.activatedRoute.snapshot.params['projectId']){ /* type이 'project'일 때 */
      this.projectInfoBoxService.setProjectId(Number(this.activatedRoute.snapshot.params['projectId']));
    }else{ /* type이 'task'일 때 */
      // console.log(this.projectInfoBoxService.getProjectId());
      // console.log(this.projectId)
    }
    /* 유입 url이 info-box를 포함하는 경우 projectInfoBoxService 통해서 (info-box가 포함된 project-container에) taskId 전달 */
    if(this.activatedRoute.snapshot.params['taskId']){this.projectInfoBoxService.setTaskId(Number(this.activatedRoute.snapshot.params['taskId']));}

    // console.log(this.projectInfoBoxService.getInfoBoxType());
    // console.log(this.projectInfoBoxService.getProjectId());
    // console.log(this.activatedRoute.snapshot.params)
  }
  
}
