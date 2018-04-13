import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectListBox } from '../project-list-box/project-list-box';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-list-box',
  templateUrl: './project-list-box.component.html',
  styleUrls: ['./project-list-box.component.css']
})
export class ProjectListBoxComponent implements OnInit {
  @Input()  public projectData: ProjectListBox;
  @Input()  public url: string;
  @Input()  public router: Router;
  @Output()  public infoBoxPropEvent = new EventEmitter();

  constructor(
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() { }
  viewProjectInfoBox(_e:Event, _projectId: number){
    let infoBoxProp: object = {}, url: any, goTitle: string = 'project';    
    infoBoxProp = {
      type: 'project',
      projectId: _projectId,
      infoBoxData: this.projectData,
      taskId: undefined,
      viewInfo: true
    };
    this.infoBoxPropEvent.emit(infoBoxProp); // project-container에 info-box 상태 전달  
    _e.stopPropagation();     
    
    this.projectInfoBoxService.setProjectData(this.projectData);
    this.projectInfoBoxService.setProjectId(_projectId);
    this.projectInfoBoxService.setInfoBoxType('project');

    url = this.url['base'] + this.url[goTitle] + _projectId + '/setting';
    this.router.navigate([url]);   
  }
}
