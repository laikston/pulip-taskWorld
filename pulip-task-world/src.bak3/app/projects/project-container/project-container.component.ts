import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { TaskListBox } from '../task-list-box/task-list-box';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {
  @ViewChild('depth2Container', { read: ViewContainerRef }) public depth2Container: ViewContainerRef;
  public gnbTitle: string = 'projects';
  public detailLink: any;   
  public type: string;
  public projectId: number;
  public taskId: number;
  public viewInfo: boolean = false;
  public viewSnb: boolean = false;
  public currentSnb: string;
  public childComponent: ComponentRef<any>;
  public infoBoxData: TaskListBox[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.detailLink = this.constantService.getSnbDetailLinkUrl(this.gnbTitle); 
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.depth2contents && data.depth2contents.length > 0){
                data.depth2contents.map(depth2content => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(depth2content);
                  this.childComponent = this.depth2Container.createComponent(componentFactory);
                  let instance = this.childComponent.instance;
                  if(instance['infoBoxPropEvent'])  instance['infoBoxPropEvent'].subscribe((data) => this.changeInfoBoxProp(data));
                  if(instance['snbEvent'])    instance['snbEvent'].subscribe((data) => this.changeSnb(data));  
                  if(instance['setInfoBoxDataEvent'])  instance['setInfoBoxDataEvent'].subscribe((data) => this.setInfoBoxData(data));
                });
              }
           });
  }  
  changeInfoBoxState(_isView, _type){ /* info-box state control */
    this.viewInfo = _isView;
    (_type != undefined) ? this.projectInfoBoxService.setInfoBoxType(_type) : this.projectInfoBoxService.setInfoBoxType(undefined) ;     
    this.type = _type;
  }
  changeInfoBoxProp(_prop){ /* ViewChild(project-list, project-task, project-timeline, project-analysis, project-file)에서 info-box가 콘트롤 되어야 할 때 info-box 상태 전달 받음 */
    this.type = _prop.type;
    this.projectId = _prop.projectId;
    this.viewInfo = _prop.viewInfo;
    this.taskId = _prop.taskId;
  }    
  changeSnb(_isView){ /* 각 ViewChild(project-list, project-task, project-timeline, project-analysis, project-file)에 따른 snb 상태 전달 받음 */
    let view: boolean = (_isView == 'list') ? false : true ;    
    this.viewSnb = view;
    setTimeout(() => { 
      this.currentSnb = _isView;
      this.projectInfoBoxService.setCurrentPage(this.currentSnb);
    });    
  }
  setSnbRouterLink(_link){ // SnbRouterLink
    var serviceUrl: any = this.constantService.getLinkUrl(this.gnbTitle),
        url: string = serviceUrl.base + serviceUrl.task + this.projectId + _link;
    return url;
  }
  setProjectInfoBoxRouterLink(){
    var serviceUrl: any = this.constantService.getLinkUrl(this.gnbTitle),
        url: string = serviceUrl.base + serviceUrl.task + this.projectId + '/' + this.currentSnb + '/setting';
    return url;
  }  
  setInfoBoxData(_e: TaskListBox[]){
    let projectData: TaskListBox;

    _e.forEach((val :any, key: any) => {
      if(val.Idx == Number(this.projectId)){
        if(this.type == 'project'){
          this.infoBoxData = val;
        }else{
          projectData = val;
          projectData['Task'].forEach((v :any, k: any) => {
            if(v.Idx == Number(this.taskId)){
              this.infoBoxData = v;
            }          
          });
        }
      }      
    });
  }
}