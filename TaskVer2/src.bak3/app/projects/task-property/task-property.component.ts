import { Component, OnInit } from '@angular/core';
import { TaskBox } from '../task-box/task-box';

@Component({
  selector: 'app-task-property',
  templateUrl: './task-property.component.html',
  styleUrls: ['./task-property.component.css']
})
export class TaskPropertyComponent implements OnInit {
  public projectId: number;
  public taskId: number;
  public data: TaskBox;
  constructor() { }
  ngOnInit() {
    console.log(this.data)
   }
}
