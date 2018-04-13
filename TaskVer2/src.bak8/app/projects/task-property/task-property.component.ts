import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { CheckListBoxComponent } from '../check-list-box/check-list-box.component';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-task-property',
  templateUrl: './task-property.component.html',
  styleUrls: ['./task-property.component.css']
})
export class TaskPropertyComponent implements OnInit {
  public projectId: number;
  public projectName: string;
  public taskId: number;
  public data: TaskBox;
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() { 
    setTimeout(() => {
      if(this.projectInfoBoxService.getProjectData())        this.projectName = this.projectInfoBoxService.getProjectData().projectname;
    });
    this.projectInfoBoxService.getProjectDataEvent.subscribe(_data => {
      this.projectName = this.projectInfoBoxService.getProjectData().projectname;
    });    
  }
}
