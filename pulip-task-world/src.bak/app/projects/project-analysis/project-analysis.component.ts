import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { TaskListBox } from '../task-list-box/task-list-box';
import { DataService } from '../../service/data.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-project-analysis',
  templateUrl: './project-analysis.component.html',
  styleUrls: ['./project-analysis.component.css']
})
export class ProjectAnalysisComponent implements OnInit, OnDestroy {
  @Output()  public infoBoxPropEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  @Output()  public snbEvent: EventEmitter<string> = new EventEmitter<string>(); /* 부모 component(project-container)에게 snb 상태 전달 */
  @Output()  public setInfoBoxDataEvent: EventEmitter<any> = new EventEmitter<any>(); /* info-box에 projectName, taskName 전달 */
  public gnbTitle: string = 'projects';
  public snbTitle: string = 'analysis';
  public projectId: number;
  public projectName: string;
  public type: string;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private location: PlatformLocation,
    private dataService: DataService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.snbEvent.emit(this.snbTitle); 
  }
  ngOnDestroy(){
  }
}
