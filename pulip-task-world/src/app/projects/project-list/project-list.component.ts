import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { ProjectListBox } from '../project-list-box/project-list-box';
import { TaskListBox } from '../task-list-box/task-list-box';
import { DataService } from '../../service/data.service';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'list';
  public url: string;
  public type: string;
  public projectId: number;
  public projectData: ProjectListBox;
  public projectListData: ProjectListBox[]; 
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private dataService: DataService,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService,
    private location: PlatformLocation
  ) { }
  ngOnInit() {
    this.location.onPopState(() => { /* history back */
      this.projectInfoBoxService.setInfoBoxType(undefined);
      setTimeout(() => { this.init(); });
    });
    this.snbEvent.emit(this.snbTitle);   
    this.url = this.constantService.getLinkUrl(this.gnbTitle); 
    this.dataService.getProjectList({}, this.setData, this); /* call data :: params :: params - type object / completeFunc - type function */      
  }
  ngOnDestroy(){ 
    window.removeEventListener('popstate', () => { /* history back event destroyed */
      this.projectInfoBoxService.setInfoBoxType(undefined);
      setTimeout(() => { this.init(); });
    });
  }
  init(){
    let viewInfo: boolean, prop: any = {}; 
    this.type = this.projectInfoBoxService.getInfoBoxType();
    if(this.type == 'project'){ /* 유입 url가 project detail info-box 활성화일 때 */
      this.projectId = this.projectInfoBoxService.getProjectId();
      if(this.projectId){
        this.projectData = this.projectInfoBoxService.filterProjectData(this.projectListData, this.projectId);
        viewInfo = true;
      }else{
        this.type = undefined;
        this.projectInfoBoxService.setInfoBoxType(undefined);
        viewInfo = false;
      }
    }else{ /* history back 이벤트 시 유입 url가 project detail info-box 비활성화일 때 */
      this.projectInfoBoxService.setProjectId(undefined);        
      viewInfo = false;
    }
    prop = { 
      projectId: this.projectId,
      infoBoxData: this.projectData,
      type: this.type,
      taskId: undefined,
      viewInfo: viewInfo
    };
    this.infoBoxPropEvent.emit(prop); 
  }
  private setData(_data, _this){ // data 수신      
    if(_this.projectInfoBoxService.getProjectId()){ /* 유입 url가 project detail info-box 활성화일 때 project name 저장&세팅 */
      _this.projectData = _this.projectInfoBoxService.filterProjectData(_data, _this.projectInfoBoxService.getProjectId());
    }       
    _this.projectListData = _data;
    _this.projectInfoBoxService.setProjectListData(_data)
    setTimeout(() => { _this.init(); });
  }
  infoBoxProp(_data){
    this.infoBoxPropEvent.emit(_data);
  }
}
