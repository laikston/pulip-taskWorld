import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {
  @Input()  public type: string;
  @Input()  public projectId: number;
  @Input()  public taskId: number;
  @Input()  public infoBoxData: any;
  @Output()  public changeInfoBoxStateEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  public setInfoBoxDataEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public url: any = {};
  public detailLink: any = {};
  public currentSnb: string;
  public firedEnterKeyEvent: boolean = false;
  public dropdownMenu: Array<any> = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.detailLink = this.constantService.getProjectInfoBoxDetailLinkUrl();
    this.url = this.constantService.getLinkUrl('projects'); 
    this.dropdownMenu = [
      {
        name: '업무삭제', function: this.deleteTask, params: undefined
      },
      {
        name: '이동', function: this.moveTask, params: undefined
      }
    ];
  }
  ngOnChanges(changes: SimpleChanges) { /* input 변수 바뀌었을 때(init 제외) projectInfoBoxService에 해당 변수 저장(info-box-container에 전달하기 위한) */
    // if(changes.projectId != undefined)  this.projectInfoBoxService.setProjectId(changes.projectId.currentValue);  
    // if(changes.taskId != undefined)  this.projectInfoBoxService.setTaskId(changes.taskId.currentValue);
    // if(changes.type != undefined)  this.projectInfoBoxService.setInfoBoxType(changes.type.currentValue);
    // if(changes.infoBoxData != undefined)  console.log(changes.infoBoxData)
  }
  changeInfoBoxState(_type){ /* info-box 열기, 닫기, routing */
    var currentPage: string = this.projectInfoBoxService.getCurrentPage(), type: string = this.type, url: string; 
    switch(type){
      case 'project':
        if(currentPage == 'list'){
          url = this.url.base + this.url[type];  
        }else{
          url = this.url.base + this.url['task'] + this.projectId + '/' + currentPage;  
        }
        break;

      case 'task' :
        url = this.url.base + this.url[type] + this.projectId + this.url.taskDetail;
        break;

      default :
        break;
    }
    this.router.navigate([url]);    
    this.changeInfoBoxStateEvent.emit(false);
  }
  setSnbRouterLink(_link){
    var link: string, type: string = this.type, currentPage: string = this.projectInfoBoxService.getCurrentPage(), currentSnb: string = this.projectInfoBoxService.getCurrentSnb();
    if(type == 'project'){
      link = (currentPage == 'list') ? this.url.base + this.url[type] + this.projectId + _link : this.url.base + this.url.task + this.projectId + '/' + currentPage + '/' + _link;      
    }else{
      link = this.url.base + this.url[type] + this.projectId + this.url.taskDetail + this.taskId + _link;
    }     
    if(this.currentSnb !== currentSnb)  setTimeout(() => {this.currentSnb = this.projectInfoBoxService.getCurrentSnb();})    
    return link;
  }
  changeDataTaskName(_e){
    let element: HTMLElement = document.querySelector('#focusoutInput') as HTMLElement;
    if(_e){
      this.firedEnterKeyEvent = true;
      this.projectInfoBoxService.setTaskSubData('Name', this.infoBoxData['Name']);
      element.focus();
    }else{
      if(this.firedEnterKeyEvent == false){
        this.projectInfoBoxService.setTaskSubData('Name', this.infoBoxData['Name']);
      }else{
        this.firedEnterKeyEvent = false;
        element.focus();
      }
    }
  }
  deleteTask(){console.log('deleteTask');}
  moveTask(){console.log('moveTask');}
}
