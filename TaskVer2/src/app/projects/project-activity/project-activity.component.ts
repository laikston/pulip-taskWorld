import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-activity',
  templateUrl: './project-activity.component.html',
  styleUrls: ['./project-activity.component.css']
})
export class ProjectActivityComponent implements OnInit {
  projectId:number;
  constructor() { }

  ngOnInit() {
  }

}
