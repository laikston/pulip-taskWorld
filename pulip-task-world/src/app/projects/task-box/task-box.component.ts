import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.css']
})
export class TaskBoxComponent implements OnInit {
  @Input()  public taskData: TaskBox;
  @Input()  public projectId: number;
  @Output()  public sendTaskIdEvent: EventEmitter<any> = new EventEmitter<any>(); /* 부모 component(project-container)에게 info-box 콘트롤 위한 상태 전달 */
  
  public isComplete: boolean;
  public taskId: number;
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    // this.isComplete = (this.taskData.Complete == 'Y') ? true : false ; // property 추가되면 풀기
    this.projectInfoBoxService.getTaskSubDataEvent.subscribe((_data) => {  
      if(this.projectInfoBoxService.getTaskId() == this.taskData['Idx']){
        let element: HTMLElement = document.querySelector('.updateView') as HTMLElement;
        element.click();
      }
    });
  }
  goTaskDetail(_taskDataIdx: number){
    this.taskId = _taskDataIdx;
    this.sendTaskIdEvent.emit(this.taskId); 
  }
  changeCompleteState(){
    // console.log(this.isComplete)
  }
  updateView(){} //updateView
  viewCheckList(){
    let data: Array<any> = this.taskData['CheckList'], isView: boolean = true, count: number = 0;
    data.forEach((value: any, key: number) => {
      if(value['Complete'] == 'Y'){
        count += 1;
      }
    });
    if(count == data.length)  isView = false;
    return isView;
  }
}
