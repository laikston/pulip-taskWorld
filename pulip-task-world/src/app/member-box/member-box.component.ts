import { Component, OnInit, Input } from '@angular/core';
import { MemeberBox } from './member-box';

@Component({
  selector: 'app-member-box',
  templateUrl: './member-box.component.html',
  styleUrls: ['./member-box.component.css']
})
export class MemberBoxComponent implements OnInit {
  @Input()  public data: MemeberBox[];
  public selectedMember: MemeberBox[] = [];
  public matchWord: string = '';
  public matchFlag: boolean[] = [];

  constructor() { }

  ngOnInit() {
    this.data.forEach((value: any, key: number) => {
      this.matchFlag.push(false);
    });
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
  selectMember(_member){
    _member.selected = true;
    this.selectedMember.push(_member);
    this.clearSearchWord();
  }
  removeMember(_id){
    this.data.forEach((value: any, key: number) => {
      if(value.id == _id){
        value.selected = false;
      }  
    });
    this.selectedMember.forEach((value: any, key: number) => {
      if(value.id == _id){
        this.selectedMember.splice(key, 1);
      }
    });
  }
  searchMember(_e){
    this.matchWord = _e.target.value;
    this.data.forEach((value: any, key: number) => {
      let tmp = value.name.match(new RegExp(this.matchWord, 'i'));
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
  completeSearchMember(){
  }
  setNoMatchedClass(_idx){
    let hasClass = (this.matchWord.length != 0) ? !this.matchFlag[_idx] : false;      
    return hasClass;
  }
  clearSearchWord(){
    this.matchWord = '';
  }
  searchInputFocus(){
    let hasClass = (this.matchWord.length != 0) ? true : false;      
    return hasClass;
  }
}
