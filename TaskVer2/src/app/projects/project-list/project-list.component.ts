import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

export class ProjectBox{
  id: number;
  title: string;
  comment: number;
  file: number;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Output()  infoBoxPropEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  snbEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 snb 상태 전달 */

  type:string;
  projectId:number;
  dummyProjectList:ProjectBox[] = [
    {
      id: 0,
      title: '프로젝트1',
      comment: 10,
      file: 0
    },
    {
      id: 1,
      title: '프로젝트2',
      comment: 12,
      file: 3
    },
    {
      id: 2,
      title: '프로젝트3',
      comment: 1,
      file: 11
    },
    {
      id: 3,
      title: '프로젝트4',
      comment: 4,
      file: 25
    },
    {
      id: 4,
      title: '프로젝트5',
      comment: 5,
      file: 11
    },
    {
      id: 5,
      title: '프로젝트6',
      comment: 70,
      file: 15
    },
    {
      id: 6,
      title: '프로젝트7',
      comment: 54,
      file: 2
    },
    {
      id: 7,
      title: '프로젝트8',
      comment: 11,
      file: 6
    }
  ]; 

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }

  ngOnInit() {
    this.snbEvent.emit('list');   
    setTimeout(() => {  
      let prop:any = {};
      /* 유입 url가 project detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.projectInfoBoxService.getInfoBoxType() == 'project'){
        prop = { 
          projectId : this.projectInfoBoxService.getProjectId(),
          type : this.projectInfoBoxService.getInfoBoxType(),
          taskId : undefined,
          viewInfo : true
        };
        this.projectId = this.projectInfoBoxService.getProjectId();
        this.infoBoxPropEvent.emit(prop);
      }
    }); 
  }

  viewProjectInfoBox(_e, _projectId){
    let infoBoxProp: object = {}, url: any;

    this.type = 'project';
    this.projectId = _projectId;

    infoBoxProp = {
      type : this.type,
      projectId : this.projectId,
      taskId : undefined,
      viewInfo : true
    };
    this.infoBoxPropEvent.emit(infoBoxProp); // project-container에 info-box 상태 전달
    
    _e.stopPropagation(); 
    
    url = '/projects/list/' + _projectId + '/setting';
    this.router.navigate([url]);     
  }
  goProjectDetail(_projectId){
    let infoBoxProp: object = {}, url: any;

    this.type = undefined;
    this.projectId = _projectId;
    infoBoxProp = {
      type : this.type,
      projectId : this.projectId,
      taskId : undefined,
      viewInfo : false
    };
    this.infoBoxPropEvent.emit(infoBoxProp);    
    this.projectInfoBoxService.setProjectId(this.projectId);
    this.projectInfoBoxService.setInfoBoxType(this.type);
    
    url = '/projects/project/' + _projectId + '/task';
    this.router.navigate([url]);   
  }
}
