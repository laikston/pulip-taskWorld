import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ProjectListBox } from '../project-list-box/project-list-box';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {
  @ViewChild('depth2Container', { read: ViewContainerRef }) public depth2Container: ViewContainerRef;
  public gnbTitle: string = 'projects';
  public detailLink: any;   
  public url: string;
  public type: string;
  public projectId: number;
  public projectName: string;  
  public projectListData: ProjectListBox[];
  public taskId: number;
  public viewInfo: boolean = false;
  public viewSnb: boolean = false;
  public currentSnb: string;
  public childComponent: ComponentRef<any>;
  public infoBoxData: TaskListBox;
  public viewProjectList: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {    
    this.url = this.constantService.getLinkUrl(this.gnbTitle); 
    if(this.projectInfoBoxService.getProjectId())  this.projectId = this.projectInfoBoxService.getProjectId();
    if(this.projectInfoBoxService.getTaskId())  this.taskId = this.projectInfoBoxService.getTaskId();
    if(this.projectInfoBoxService.getInfoBoxType())  this.projectInfoBoxService.getInfoBoxType();        
    this.projectListData = this.projectInfoBoxService.getProjectListData();
    this.projectInfoBoxService.getProjectListDataEvent.subscribe((_data) => {
      this.projectListData = this.projectInfoBoxService.getProjectListData();
    }); 
    this.projectName = this.projectInfoBoxService.getProjectData()['projectname'];
    this.projectInfoBoxService.getProjectDataEvent.subscribe((_data) => {
      this.projectName = this.projectInfoBoxService.getProjectData()['projectname'];
    });   
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.depth2contents && data.depth2contents.length > 0){
                data.depth2contents.map(depth2content => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(depth2content);
                  this.childComponent = this.depth2Container.createComponent(componentFactory);           
                  let instance = this.childComponent.instance; 
                  this.currentSnb = instance.snbTitle;
                  if(instance['infoBoxPropEvent'])  instance['infoBoxPropEvent'].subscribe((data) => this.changeInfoBoxProp(data));
                  if(instance['snbEvent'])    instance['snbEvent'].subscribe((data) => this.changeSnb(data));  
                  if(instance['setInfoBoxDataEvent'])  instance['setInfoBoxDataEvent'].subscribe((data) => this.setInfoBoxData(data));
                });
              }
           }); 
    this.detailLink = this.constantService.getSnbDetailLinkUrl(this.gnbTitle); 
    this.projectInfoBoxService.getViewInfoEvent.subscribe((_isView) => {
      this.viewInfo = false;
    });    
  } 
  changeInfoBoxState(_isView: boolean, _type: string){ /* info-box state control */
    this.viewInfo = _isView;
    if(_type != undefined){
      this.type = _type;
    }
    if(_isView == false){
      this.type = undefined
    }else{
      if(this.type == 'project'){
        this.infoBoxData = this.projectInfoBoxService.getProjectData();
      }else if(this.type == 'task'){
        this.infoBoxData = this.projectInfoBoxService.getTaskData();
      }else{
        this.infoBoxData = undefined;
      }
    }
    this.projectInfoBoxService.setInfoBoxType(this.type);    
  }
  changeInfoBoxProp(_prop: any){ /* ViewChild info-box 상태 전달 받음 */    
    this.projectId = _prop.projectId;
    this.taskId = _prop.taskId;
    this.type = _prop.type;
    this.infoBoxData = _prop.infoBoxData; 
    this.viewInfo = _prop.viewInfo;   
  }    
  changeSnb(_currentView: string){ /* 각 ViewChild(project-list, project-task, project-timeline, project-analysis, project-file)에 따른 snb 상태 전달 받음 */
    let view: boolean = (_currentView == 'list') ? false : true ;    
    this.viewSnb = view;
    setTimeout(() => { 
      this.currentSnb = _currentView;
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
  setInfoBoxData(_e: TaskListBox){
    this.infoBoxData = _e;  
  }
  changeProjectList(){
    this.viewProjectList = !this.viewProjectList;
    if(this.viewInfo == true)  this.viewInfo = false;
  }
  setCurrentSnb(_link: string){
    var hasClass: any = _link.split('/')[1] == this.currentSnb;
    return hasClass;
  }
}