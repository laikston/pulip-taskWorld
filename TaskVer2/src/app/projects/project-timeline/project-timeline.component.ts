import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.css']
})
export class ProjectTimelineComponent implements OnInit {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  public projectId: number;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.snbEvent.emit('timeline');
    setTimeout(() => {     
      /* 유입 url가 task detail info-box 비활성화일 때 project-container에 info-box세팅할 수 있도록 property 세팅 */
      let prop: any = { 
        projectId: this.activatedRoute.snapshot.params.projectId,
        type: this.projectInfoBoxService.getInfoBoxType(),
        taskId: undefined,
        viewInfo: false
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
