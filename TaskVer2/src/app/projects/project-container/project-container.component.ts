import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {
  @ViewChild('depth2Container', { read: ViewContainerRef }) depth2Container: ViewContainerRef;
  detailLink:any = []; 
  type:string;
  projectId:number;
  taskId:number;
  viewInfo:boolean = false;
  viewSnb:boolean = false;
  currentSnb:string;

  childComponent:ComponentRef<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }

  ngOnInit() {
    var THIS = this;
    this.detailLink = [
      {
        link : '/task',
        title : '업무'
      },
      {
        link : '/timeline',
        title : '타임라인'
      },
      {
        link : '/analysis',
        title : '분석'
      },
      {
        link : '/file',
        title : '파일'
      }
    ];

    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.depth2contents && data.depth2contents.length > 0){
                data.depth2contents.map(depth2content => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(depth2content);
                  this.childComponent = this.depth2Container.createComponent(componentFactory);
                  let instance = this.childComponent.instance;
                  if(instance['infoBoxPropEvent'])  instance['infoBoxPropEvent'].subscribe((data) => this.changeInfoBoxProp(data));
                  if(instance['snbEvent'])    instance['snbEvent'].subscribe((data) => this.changeSnb(data));  
                });
              }
           }); 
  }  
  changeInfoBoxState(_isView, _type){ /* info-box state control */
    this.viewInfo = _isView;
    (_type) ? this.projectInfoBoxService.setInfoBoxType(_type) : this.projectInfoBoxService.setInfoBoxType(undefined) ;     
    this.type = _type;
  }
  changeInfoBoxProp(_prop){ /* ViewChild(project-list, project-task, project-timeline, project-analysis, project-file)에서 info-box가 콘트롤 되어야 할 때 info-box 상태 전달 받음 */
    this.type = _prop.type;
    this.projectId = _prop.projectId;
    this.viewInfo = _prop.viewInfo;
    this.taskId = _prop.taskId;
  }    
  changeSnb(_isView){ /* 각 ViewChild(project-list, project-task, project-timeline, project-analysis, project-file)에 따른 snb 상태 전달 받음 */
    let view:boolean = (_isView == 'list') ? false : true ;    
    this.viewSnb = view;
    setTimeout(() => { 
      this.currentSnb = _isView;
      this.projectInfoBoxService.setCurrentPage(this.currentSnb);
    });    
  }


  setSnbRouterLink(_link){ // SnbRouterLink
    var url:string = '/projects/project/' + this.projectId + _link;
    return url;
  }
  setProjectInfoBoxRouterLink(){
    var url:string = '/projects/project/' + this.projectId + '/' + this.currentSnb + '/setting';
    return url;
  }  
}