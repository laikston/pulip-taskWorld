import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-property',
  templateUrl: './task-property.component.html',
  styleUrls: ['./task-property.component.css']
})
export class TaskPropertyComponent implements OnInit {
  projectId: number;
  taskId: number;
  constructor() { }
  ngOnInit() { }
}
