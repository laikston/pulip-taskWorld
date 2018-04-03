import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-file',
  templateUrl: './project-file.component.html',
  styleUrls: ['./project-file.component.css']
})
export class ProjectFileComponent implements OnInit {
  @Output()  infoBoxPropEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  snbEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  projectId: number;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.snbEvent.emit('file');
    setTimeout(() => {     
      /* 유입 url가 task detail info-box 비활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      let prop:any = { 
        projectId : this.activatedRoute.snapshot.params.projectId,
        type : this.projectInfoBoxService.getInfoBoxType(),
        taskId : undefined,
        viewInfo : false
      };
      this.projectId = this.activatedRoute.snapshot.params.projectId; 
      /* 유입 url가 project detail info-box 활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      if(this.projectInfoBoxService.getInfoBoxType() == 'project'){
        this.projectInfoBoxService.setProjectId(this.projectId);
        prop.viewInfo = true;
      }
      this.infoBoxPropEvent.emit(prop);
    });
  } 
}
