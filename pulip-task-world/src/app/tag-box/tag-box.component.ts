import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {
  @Input() public data: Array<any>;
  public selectedTag: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
  setTagStyleClass(_group){
    var className: string = _group;
    return className;
  }
  selectTag(_tag){
    _tag.selected = !_tag.selected;
    if(_tag.selected == true){
      this.selectedTag.push(_tag);
    }else{
      this.removeTag(_tag.id);
    }
  }
  removeTag(_id){
    this.selectedTag.forEach((value: any, key: number) => {
      if(value.id == _id){
        this.selectedTag.splice(key, 1);
      }
    });
  }

}
