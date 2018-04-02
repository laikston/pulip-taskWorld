import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {
  @Input()  type:string;
  @Input()  projectId:number;
  @Input()  taskId:number;
  @Output()  changeInfoBoxStateEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  url:any = {};
  detailLink:any = {};
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }

  ngOnInit() {
    this.detailLink = {
      project : [
        {
          link : '/setting',
          title : '설정'
        },
        {
          link : '/activity',
          title : '모든활동'
        }
      ],
      task : [
        {
          link : '/property',
          title : '속성'
        },
        {
          link : '/comment',
          title : '코멘트'
        },
        {
          link : '/file',
          title : '파일 & 링크'
        }
      ]
    };

    this.url = {
      base: '/projects/',
      project: 'list/',
      task: 'project/',
      taskDetail: '/task/'
    }; 
  }

  ngOnChanges(changes: SimpleChanges) { /* url route 변수 바뀌었을 때(init 제외) projectInfoBoxService에 해당 변수 저장(info-box-container에 전달하기 위한) */
    if(changes.projectId != undefined)  this.projectInfoBoxService.setProjectId(changes.projectId.currentValue);  
    if(changes.taskId != undefined)  this.projectInfoBoxService.setTaskId(changes.taskId.currentValue);
  }

  changeInfoBoxState(_type){ /* info-box 열기/닫기 */
    // var url:string = (this.type == 'project') ? this.url[this.type] : this.url[this.type] + this.projectId;
    // this.router.navigate([url]);    
    this.changeInfoBoxStateEvent.emit(false);
  }

  setSnbRouterLink(_link){
    var link: string, type: string = this.type, currentPage: string = this.projectInfoBoxService.getCurrentPage();
    if(type == 'project'){
      link = (currentPage == 'list') ? this.url.base + this.url[type] + this.projectId + _link : this.url.base + this.url.task + this.projectId + '/' + currentPage + '/' + _link;      
    }else{
      link = this.url.base + this.url[type] + this.projectId + this.url.taskDetail + this.taskId + _link;
    }    
    return link;
  }
}
