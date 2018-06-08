import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit, OnChanges {
  @Input() public data: any;
  @Input() public projectId: number;
  @Input() public taskId: number;
  public selectedTag: Array<any> = [];
  public tagColor: string[] = ['purple', 'blue', 'green', 'yellow', 'red', 'brown', 'skyblue', 'hotpink', 'orange', 'rainbow'];
  public tagBox: boolean = false;
  public newTagBox: boolean = true;
  public newTag: any = {};
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.initNewTag();    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data != undefined && changes.data.currentValue != undefined){
      this.selectedTag = changes.data.currentValue;
    }
  }
  initNewTag(){
    this.newTag.color = this.tagColor[0];
    this.newTag.name = undefined;
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
  deleteTag(_id){
    let tag: any = {
      'project_idx': this.projectId,
      'task_idx': this.taskId,
      'tag_idx': _id
    };
    this.dataService.deleteTag(tag, this.deleteTagComplete, this);
  }  
  deleteTagComplete(_data, _this){if(console)  console.log(_data)}
  selectTagColor(_color){
    this.newTag['color'] = _color;
  }
  setTagClass(_color){
    var className: string = _color;
    return className;
  }
  confirmNewTag(){
    let newTag: any = {
      'project_idx': this.projectId,
      'task_idx': this.taskId,
      'tag_name': this.newTag.name,
      'tag_class': this.newTag.color
    };
    this.dataService.changeTag(newTag, this.confirmNewTagComplete, this);
    this.initNewTag();
  }
  confirmNewTagComplete(_data, _this){if(console)  console.log(_data)}
}
