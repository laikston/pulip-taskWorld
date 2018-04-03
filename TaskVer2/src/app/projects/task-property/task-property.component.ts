import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-property',
  templateUrl: './task-property.component.html',
  styleUrls: ['./task-property.component.css']
})
export class TaskPropertyComponent implements OnInit {
  public projectId: number;
  public taskId: number;
  constructor() { }
  ngOnInit() { }
}
