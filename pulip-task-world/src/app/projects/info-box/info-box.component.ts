import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskListBox } from '../task-list-box/task-list-box';
import { ConstantService } from '../../service/constant.service';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit, OnChanges {
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
  public dropdownMenu: Array<any> = [
    {name: '업무 삭제', function: this.deleteTask, params: {'content': {'project_idx': this.projectId, 'task_idx': this.taskId}, 'component': this}},
    {name: '이동', function: this.moveTask, params: {'content': {}, 'component': this}}
  ];
  public taskTitle: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService,
    private dataService: DataService
  ) { }
  ngOnInit() {
    this.detailLink = this.constantService.getProjectInfoBoxDetailLinkUrl();
    this.url = this.constantService.getLinkUrl('projects'); 
  }
  ngOnChanges(changes: SimpleChanges) { 
    if(changes.projectId != undefined && changes.projectId.currentValue != undefined)  this.dropdownMenu[0]['params']['content']['project_idx'] = this.projectId;  
    if(changes.taskId != undefined && changes.taskId.currentValue != undefined)  this.dropdownMenu[0]['params']['content']['task_idx'] = this.taskId; 
    // if(changes.type != undefined)  this.projectInfoBoxService.setInfoBoxType(changes.type.currentValue);
    if(changes.infoBoxData != undefined && changes.infoBoxData.currentValue != undefined)  this.taskTitle = changes.infoBoxData.currentValue;
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
  changeDataTaskName(_infoBoxData){
    if(this.firedEnterKeyEvent == true){
      this.firedEnterKeyEvent = false;
    }else{
      this.changeTask(_infoBoxData);
    }
  }
  changeTask(_infoBoxData){
    let newTask = {
      'project_idx': this.projectId,
      'task_group_idx': _infoBoxData['Parent_idx'],
      'task_idx': _infoBoxData['Idx'],
      'task_name': _infoBoxData['Name'],
      'task_member_idx': _infoBoxData['AssiMember'],
      'task_info': "",
      'task_tags': _infoBoxData['Tag'],
      'isfinish': "N",
      'order_no': _infoBoxData['Order']
    };
    if(this.firedEnterKeyEvent != true)  this.firedEnterKeyEvent = true;
    if(_infoBoxData['Name'] != this.taskTitle)  this.dataService.changeTask(newTask, this.changeTaskComplete, this);
  }
  deleteTask(_obj: any){
    let params: any = _obj['content'],
        _this = _obj['component'];
    _this.dataService.deleteTask(params, _this.deleteTaskComplete, _this);
  }
  deleteTaskComplete(_data, _this){
    let url: string, goTitle: string = 'task'; 
    console.log('deleteTask :: ', _data.msg);
    if(_data.msg == '성공'){
      _this.projectInfoBoxService.setInfoBoxType(undefined);  
      _this.projectInfoBoxService.setTaskId(undefined);
      _this.projectInfoBoxService.setViewInfoEvent(false);

      url = _this.url['base'] + _this.url[goTitle] + _this.projectId + '/' + goTitle;
      _this.router.navigate([url]);
    }
  }
  changeTaskComplete(_data, _this){
    let element: HTMLElement = document.querySelector('#focusoutInput') as HTMLElement;
    console.log('changeTask :: ', _data.msg);
    element.focus();
  }
  moveTask(){console.log('moveTask');}
}
