import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.css']
})
export class TaskCommentComponent implements OnInit {
  public projectId: number;
  public taskId: number;  
  constructor() { }
  ngOnInit() { }
}
