import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-file',
  templateUrl: './task-file.component.html',
  styleUrls: ['./task-file.component.css']
})
export class TaskFileComponent implements OnInit {
  projectId:number;
  taskId:number;
  constructor() { }

  ngOnInit() {
  }

}
