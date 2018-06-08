import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConstantService } from '../../service/constant.service';
import { DataService } from '../../service/data.service';
import 'rxjs/Rx' ;

@Component({
  selector: 'app-task-file-box',
  templateUrl: './task-file-box.component.html',
  styleUrls: ['./task-file-box.component.css']
})
export class TaskFileBoxComponent implements OnInit {
  @Input()  projectId: number;
  @Input()  fileData: any;
  public dropdownMenu: Array<any> = [
    {name: '파일 삭제', function: this.deleteFile, params: {'content': {'project_idx': this.projectId, 'task_file_idx': 0}, 'component': this}},
    {name: '다운로드', function: this.downloadFile, params: {'content': {}, 'component': this}}
  ];

  constructor(
    private constantService: ConstantService,
    private dataService: DataService
  ) { }
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.fileData != undefined){
      if(changes.fileData.currentValue != undefined){
        this.dropdownMenu[0].params.content['task_file_idx'] = changes.fileData.currentValue['Idx'];
        this.dropdownMenu[1].params.content['download'] = changes.fileData.currentValue['File_name'];
        this.dropdownMenu[1].params.content['link'] = this.constantService.getApiUrl('projects', 'taskfile') + '?task_file_idx=' + changes.fileData.currentValue['Idx'];
      }
    }
    if(changes.projectId != undefined){
      if(changes.projectId.currentValue != undefined){
        this.dropdownMenu[0].params.content['project_idx'] = changes.projectId.currentValue;
      }
    }
  }
  deleteFile(_obj: any){
    let file = {
      'task_file_idx': _obj.content['task_file_idx'],
      'project_idx': _obj.content['project_idx']
    },
    _this = _obj.component;
    _this.dataService.deleteFile(file, _this.deleteFileComplete, _this);
  }
  deleteFileComplete(_data, _this){
    if(console)  console.log(_data)
  }
  downloadFile(_obj: any){
    let linkUrl: string = _obj.content['link'],
        downloadUrl: string = _obj.content['download'],
        $a = document.createElement("a");
        
    $a.download = downloadUrl;
    $a.href = linkUrl;
    document.body.appendChild($a);
    $a.click();
    document.body.removeChild($a);
  }
}
