import { Component, OnInit } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { DataService } from '../../service/data.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-task-comment',
  templateUrl: './task-comment.component.html',
  styleUrls: ['./task-comment.component.css']
})
export class TaskCommentComponent implements OnInit {
  public projectId: number;
  public taskId: number;
  public data: TaskBox;
  public firedEnterKeyEvent: boolean = false;  
  public commentContents: string = '';
  public memberIdx: number;
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService,
    private dataService: DataService,
    private loginService: LoginService
  ) { }
  ngOnInit() {
    this.memberIdx = this.loginService.getMemberIdx();
  }  
  addComment(_e){
    let newData = {
      'project_idx': this.projectId,
      'task_idx': this.taskId,
      'comments': this.commentContents,
      'member_idx': this.memberIdx
    };
    this.dataService.addComment(newData, this.addCommentComplete, this);
    _e.preventDefault();
  }
  addCommentComplete(_data, _this){
    if(_data.msg == '성공')  _this.commentContents = '';
  }
  changeComment(_e, _comment){
    let newData = {
      'project_idx': this.projectId,
      'task_idx': this.taskId,
      'task_comment_idx': _comment['Idx'],
      'comments': _comment['Comments'],
      'member_idx': this.memberIdx
    };
    this.dataService.changeComment(newData, this.changeCommentComplete, this);
    _e.preventDefault();
  }
  changeCommentComplete(_data, _this){
    console.log(_data.msg);
  }
  deleteComment(_idx){
    let newData = {
      'project_idx': this.projectId,
      'task_comment_idx': _idx
    };
    this.dataService.deleteComment(newData, this.deleteCommentComplete, this);
  }
  deleteCommentComplete(_data, _this){
    console.log(_data.msg);
  }
}
