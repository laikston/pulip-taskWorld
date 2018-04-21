import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectListBox } from '../project-list-box/project-list-box';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-list-header-box',
  templateUrl: './project-list-header-box.component.html',
  styleUrls: ['./project-list-header-box.component.css']
})
export class ProjectListHeaderBoxComponent implements OnInit {
  @Input()  public projectData: ProjectListBox;
  @Input()  public url: string;
  @Input()  public router: Router;

  constructor(
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() { }
  goProjectDetail(_projectId: number){
    let url: string, goTitle: string = 'task', infoBoxProp: any; 

    this.projectInfoBoxService.setProjectData(this.projectData);
    this.projectInfoBoxService.setProjectId(_projectId);
    this.projectInfoBoxService.setInfoBoxType(undefined);  
    this.projectInfoBoxService.setTaskId(undefined);
    this.projectInfoBoxService.setViewInfoEvent(false);

    url = this.url['base'] + this.url[goTitle] + _projectId + '/' + goTitle;
    this.router.navigate([url]);   
  }
}
