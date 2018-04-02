import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-analysis',
  templateUrl: './project-analysis.component.html',
  styleUrls: ['./project-analysis.component.css']
})
export class ProjectAnalysisComponent implements OnInit {
  @Output()  infoBoxPropEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  snbEvent = new EventEmitter<any>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  projectId:number;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }

  ngOnInit() {
    this.snbEvent.emit('analysis');
    setTimeout(() => {     
      /* 유입 url component가 project-task, project-timeline, project-analysis, project-file 일 때 project-container에 info-box세팅할 수 있도록 property 전달 */
      var prop:object = { 
        projectId : this.activatedRoute.snapshot.params.projectId,
        type : undefined,
        taskId : undefined,
        viewInfo : false
      };
      this.projectId = this.activatedRoute.snapshot.params.projectId;
      this.infoBoxPropEvent.emit(prop);
    });
  }  
}
