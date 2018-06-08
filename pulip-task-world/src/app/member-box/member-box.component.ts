import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MemeberBox } from './member-box';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-member-box',
  templateUrl: './member-box.component.html',
  styleUrls: ['./member-box.component.css']
})
export class MemberBoxComponent implements OnInit, OnChanges {
  @Input()  public data: MemeberBox[];
  @Input()  public optionData: MemeberBox[];
  @Input() public projectId: number;
  @Input() public taskId: number;
  public selectedMember: MemeberBox[] = [];
  public matchWord: string = '';
  public matchFlag: boolean[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data != undefined && changes.data.currentValue != undefined){
      this.selectedMember = changes.data.currentValue;
    }
    if(changes.optionData != undefined && changes.optionData.currentValue != undefined){
      this.optionData.forEach((value: any, key: number) => {
        this.matchFlag.push(false);
      });
      if(this.data != null){
        this.optionData.forEach((value: any, key: number) => {
          this.data.forEach((v: any, k: number) => {
            if(v.member_idx == value.member_idx){
              value.selected = true;
            }
          });
        });
      }
    }
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
  selectMember(_member){
    let newData: any = {
      'project_idx': this.projectId, 
      'task_idx': this.taskId,
      'member_file_idx': _member.member_file_idx,
      'member_idx': _member.member_idx,
      'memeber_name': _member.memeber_name,
      'pos_name': _member.PosName,
      'duty_name': _member.DutyName
    };
    _member.selected = true;
    this.clearSearchWord();
    this.dataService.changeMember(newData, this.changeMemberComplete, this);
  }
  changeMemberComplete(_data, _this){
    if(console)  console.log(_data);
  }
  removeMember(_id){
    let deleteData: any = {
      'project_idx': this.projectId, 
      'task_idx': this.taskId,
      'member_idx': _id
    };
    this.optionData.forEach((value: any, key: number) => {
      if(value.member_idx == _id){
        value.selected = false;
      }  
    });
    this.dataService.deleteMember(deleteData, this.deleteMemberComplete, this);    
  }
  deleteMemberComplete(_data, _this){
    if(console)  console.log(_data);
  }
  searchMember(_e){
    this.matchWord = _e.target.value;
    this.optionData.forEach((value: any, key: number) => {
      let tmp = value.MemeberName.match(new RegExp(this.matchWord, 'i'));
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