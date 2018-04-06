import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { CheckListBoxComponent } from '../check-list-box/check-list-box.component';

@Component({
  selector: 'app-task-property',
  templateUrl: './task-property.component.html',
  styleUrls: ['./task-property.component.css']
})
export class TaskPropertyComponent implements OnInit {
  public projectId: number;
  public projectName: string;
  public taskId: number;
  public taskName: string;
  public data: TaskBox;
  constructor() { }
  ngOnInit() { }
}
