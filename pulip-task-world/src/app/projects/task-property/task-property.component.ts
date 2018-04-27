import { Component, OnInit } from '@angular/core';
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
  public firedEnterKeyEvent: boolean = false;
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
  changeDataContent(_e){
    if(_e){ // 동기화 되는 화면이 없으므로 바로 api처리, sevice에 해당하는 data도 있으므로 service에 넣어줄 것
      this.firedEnterKeyEvent = true;
      this.projectInfoBoxService.setTaskSubData('Content', this.data['Content']);
    }else{
      if(this.firedEnterKeyEvent == false){
        this.projectInfoBoxService.setTaskSubData('Content', this.data['Content']);
      }else{
        this.firedEnterKeyEvent = false;
      }
    }
  }
}
