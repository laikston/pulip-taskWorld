import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

export class ProjectBox{
  seq: string;
  email: string;
  name: string;
  idx: number;
}
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'list';
  public url: string;
  public type: string;
  public projectId: number;
  public projectName: string;
  public dummyProjectList: ProjectBox[]; 
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private dataService: DataService,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.snbEvent.emit(this.snbTitle);   
    this.url = this.constantService.getLinkUrl(this.gnbTitle); 
    this.dataService.getProjectList({}, this.setData, this); /* call data :: params :: params - type object / completeFunc - type function */    
  }
  init(){
    setTimeout(() => {  
      let prop:any = {};
      /* 유입 url가 project detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.projectInfoBoxService.getInfoBoxType() == 'project'){
        prop = { 
          projectId: this.projectInfoBoxService.getProjectId(),
          projectName: this.projectInfoBoxService.getProjectName(),
          type: this.projectInfoBoxService.getInfoBoxType(),
          taskId: undefined,
          viewInfo: true
        };
        this.projectId = this.projectInfoBoxService.getProjectId();
        this.infoBoxPropEvent.emit(prop);
      }
    }); 

  }
  private setData(_data, _this){ // data 수신   
    /* 유입 url가 project detail info-box 활성화일 때 project name 저장&세팅 */
    if(_this.projectInfoBoxService.getProjectId()){ 
      _data.forEach((value: any, key: number) => {
        if(value.projectid == _this.projectInfoBoxService.getProjectId()){          
          _this.projectName = value.projectname;
          _this.projectInfoBoxService.setProjectName(value.projectname);
        }
      });
    }       
    _this.dummyProjectList = _data;
    _this.init();
  }
  viewProjectInfoBox(_e:Event, _projectId: number, _projectName: string){
    console.log('value ::: ' + JSON.stringify(_e) + '_projectId ::: ' + _projectId);
    let infoBoxProp: object = {}, url: any, goTitle: string = 'project';
    this.type = 'project';
    this.projectId = _projectId;
    this.projectName = _projectName;
    infoBoxProp = {
      type: this.type,
      projectId: this.projectId,
      projectName: _projectName,
      taskId: undefined,
      viewInfo: true
    };
    this.infoBoxPropEvent.emit(infoBoxProp); // project-container에 info-box 상태 전달    
    _e.stopPropagation();     
    url = this.url['base'] + this.url[goTitle] + _projectId + '/setting';
    this.router.navigate([url]);   
  }
  goProjectDetail(_projectId: number, _projectName: string){
    let infoBoxProp: object = {}, url: any, goTitle: string = 'task';
    this.type = undefined;
    this.projectId = _projectId;
    this.projectName = _projectName;
    infoBoxProp = {
      type: this.type,
      projectId: this.projectId,
      projectName: _projectName,
      taskId: undefined,
      viewInfo: false
    };
    this.infoBoxPropEvent.emit(infoBoxProp);    
    this.projectInfoBoxService.setProjectId(this.projectId);
    this.projectInfoBoxService.setProjectName(_projectName);
    this.projectInfoBoxService.setInfoBoxType(this.type);    
    url = this.url['base'] + this.url[goTitle] + _projectId + '/' + goTitle;
    this.router.navigate([url]);   
  }
}
