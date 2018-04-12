import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { TaskListBox } from '../task-list-box/task-list-box';
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
export class ProjectListComponent implements OnInit, OnDestroy {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'list';
  public url: string;
  public type: string;
  public projectId: number;
  public projectName: string;
  public dummyProjectList: ProjectBox[]; 
  public tempProjectData: any = [
    {
      'idx': 3080,
      'code' : '18SS001',
      'content' : '타이틀리스트 슈어핏 APP & 피팅데이터센터 구축',
      'group' : '이마케팅그룹',
      'start_date' : '2018년 3월 2일',
      'end_date' : '2018년 7월 31일',
      'open_date' : '2018년 8월 1일',
      'pd' : '홍길동 실장',
      'pm': '김플립 수석',
      'team': ['이플립 책임', '박플립 선임', '홍플립 주임'],
      'goal': '18%',
      'current' : '15%',
      'report': {
        'title': '착수보고서 v8.0',
        'reg_date': '2018.04.03',
        'url': 'aaa.doc'
      }
    },
    {
      'idx': 3151,
      'code' : '18SS002',
      'content' : '전자투표 전자위임장 모바일 서비스 구축',
      'group' : '이마케팅그룹',
      'start_date' : '2018년 3월 2일',
      'end_date' : '2018년 7월 31일',
      'open_date' : '2018년 8월 1일',
      'pd' : '홍길동 실장',
      'pm': '김플립 수석',
      'team': ['이플립 책임', '박플립 선임', '홍플립 주임'],
      'goal': '18%',
      'current' : '15%',
      'report': {
        'title': '착수보고서 v8.0',
        'reg_date': '2018.04.03',
        'url': 'aaa.doc'
      }
    },
    {
      'idx': 3228,
      'code' : '18SS003',
      'content' : '삼성화재 홈페이지 리뉴얼',
      'group' : '이마케팅그룹',
      'start_date' : '2018년 3월 2일',
      'end_date' : '2018년 7월 31일',
      'open_date' : '2018년 8월 1일',
      'pd' : '홍길동 실장',
      'pm': '김플립 수석',
      'team': ['이플립 책임', '박플립 선임', '홍플립 주임'],
      'goal': '18%',
      'current' : '15%',
      'report': {
        'title': '착수보고서 v8.0',
        'reg_date': '2018.04.03',
        'url': 'aaa.doc'
      }
    },
    {
      'idx': 3244,
      'code' : '18SS004',
      'content' : '2018년 3월 삼성증권 캠페인 페이지 및 광고 제작',
      'group' : '이마케팅그룹',
      'start_date' : '2018년 3월 2일',
      'end_date' : '2018년 7월 31일',
      'open_date' : '2018년 8월 1일',
      'pd' : '홍길동 실장',
      'pm': '김플립 수석',
      'team': ['이플립 책임', '박플립 선임', '홍플립 주임'],
      'goal': '18%',
      'current' : '15%',
      'report': {
        'title': '착수보고서 v8.0',
        'reg_date': '2018.04.03',
        'url': 'aaa.doc'
      }
    }
];
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
    let type: string = this.projectInfoBoxService.getInfoBoxType(), viewInfo: boolean, prop: any = {};  
    if(type == 'project'){ /* 유입 url가 project detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.projectInfoBoxService.getProjectId()){
        this.projectInfoBoxService.filterProjectName(this.dummyProjectList, this.projectInfoBoxService.getProjectId(), this);
        viewInfo = true;
      }else{
        type = undefined;
        this.projectInfoBoxService.setInfoBoxType(undefined);
        viewInfo = false;
      }      
    }else{ /* history back 이벤트 시 유입 url가 project detail info-box 비활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      this.projectInfoBoxService.setProjectId(undefined);        
      this.projectInfoBoxService.setProjectName(undefined);      
      viewInfo = false;
    }
    prop = { 
      projectId: this.projectInfoBoxService.getProjectId(),
      projectName: this.projectInfoBoxService.getProjectName(),
      type: type,
      taskId: undefined,
      viewInfo: viewInfo
    };
    this.infoBoxPropEvent.emit(prop); 
  }
  private setData(_data, _this){ // data 수신       
    if(_this.projectInfoBoxService.getProjectId()){ /* 유입 url가 project detail info-box 활성화일 때 project name 저장&세팅 */
      _this.projectInfoBoxService.filterProjectName(_data, _this.projectInfoBoxService.getProjectId(), _this);
    }       
    _this.dummyProjectList = _data;
    setTimeout(() => { _this.init(); });
  }
  viewProjectInfoBox(_e:Event, _projectId: number, _projectName: string){
    let infoBoxProp: object = {}, url: any, goTitle: string = 'project', projectData: any;
    this.type = 'project';
    this.projectId = _projectId;
    this.projectName = _projectName;
    this.tempProjectData.forEach((value: any, key: number) => {
      if(value.idx == this.projectId){
        projectData = value;
      }      
    });
    infoBoxProp = {
      type: this.type,
      projectId: this.projectId,
      projectName: _projectName,
      projectData: projectData,
      taskId: undefined,
      viewInfo: true
    };
    this.infoBoxPropEvent.emit(infoBoxProp); // project-container에 info-box 상태 전달    
    _e.stopPropagation();     
    url = this.url['base'] + this.url[goTitle] + _projectId + '/setting';
    this.router.navigate([url]);   
  }
  goProjectDetail(_projectId: number, _projectName: string){
    let infoBoxProp: object = {}, url: any, goTitle: string = 'task', projectData: any;    
    this.type = undefined;
    this.projectId = _projectId;
    this.projectName = _projectName;
    this.tempProjectData.forEach((value: any, key: number) => {
      if(value.idx == this.projectId){
        projectData = value;
      }      
    });
    infoBoxProp = {
      type: this.type,
      projectId: this.projectId,
      projectName: _projectName,
      projectData: projectData,
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
