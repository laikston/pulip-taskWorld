import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TagBox } from './tag-box';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {
  @Input() public data: Array<any>;
  @Output()  public updateDataEvent = new EventEmitter<TagBox>();
  public selectedTag: Array<any> = [];
  public matchTag: string = '';
  public matchFlag: boolean[] = [];
  public tagColor: string[] = ['purple', 'blue', 'green', 'yellow', 'red', 'brown', 'skyblue', 'hotpink', 'orange', 'rainbow'];
  public tagBox: boolean = false;
  public newTagBox: boolean = false;
  public newTag: any = {};
  constructor() { }

  ngOnInit() {
    this.data.forEach((value: any, key: number) => {
      this.matchFlag.push(false);
    });
    this.initNewTag();
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
  setTagClass(_group){
    var className: string = _group;
    return className;
  }
  toggleTag(_tag){
    _tag.selected = !_tag.selected;
    if(_tag.selected == true){
      this.selectedTag.push(_tag);
    }else{
      this.removeTag(_tag.id);
    }
    this.clearSearchTag();
  }
  removeTag(_id){
    this.data.forEach((value: any, key: number) => {
      if(value.id == _id){
        value.selected = false;
        this.updateDataEvent.emit(Object.assign({}, this.data[key]));
      }  
    });
    this.selectedTag.forEach((value: any, key: number) => {
      if(value.id == _id){        
        this.selectedTag.splice(key, 1);
      }
    });
  }
  searchTag(_e){
    this.matchTag = _e.target.value;
    this.data.forEach((value: any, key: number) => {
      let tmp = value.name.match(new RegExp(this.matchTag, 'i'));
      this.matchFlag[key] = (tmp != null) ? true : false;
      if(tmp != null){
        if(tmp[0] != undefined){
          if(tmp[0].length == 0){
            this.matchFlag[key] = false;
          }
        }
      }
    });
  }
  completeSearchTag(){
  }
  setNoMatchedClass(_idx){
    let hasClass = (this.matchTag.length != 0) ? !this.matchFlag[_idx] : false;      
    return hasClass;
  }
  clearSearchTag(){
    this.matchTag = '';
  }
  searchInputFocus(){
    let hasClass = (this.matchTag.length != 0) ? true : false;      
    return hasClass;
  }
  initNewTag(){
    this.newTag.group = this.tagColor[0];
    this.newTag.name = undefined;
  }
  selectTagColor(_color){
    this.newTag['group'] = _color;
  }
  confirmNewTag(){
    this.newTag['id'] = 115; // 서버에서 id받아야 함.
    this.newTag['selected'] = true;    
    this.updateDataEvent.emit(Object.assign({}, this.newTag));  
    this.newTag['selected'] = false;    
    this.toggleTag(Object.assign({}, this.newTag));
    this.initNewTag();
  }
}
