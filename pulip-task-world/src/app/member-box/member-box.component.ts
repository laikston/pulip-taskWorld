import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-box',
  templateUrl: './member-box.component.html',
  styleUrls: ['./member-box.component.css']
})
export class MemberBoxComponent implements OnInit {
  @Input()  public data: Array<any>;
  public selectedMember: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
  selectMember(_member){
    _member.selected = true;
    this.selectedMember.push(_member);
  }
  removeMember(_id){
    this.selectedMember.forEach((value: any, key: number) => {
      if(value.id == _id){
        this.selectedMember.splice(key, 1);
      }
    });
  }
}
