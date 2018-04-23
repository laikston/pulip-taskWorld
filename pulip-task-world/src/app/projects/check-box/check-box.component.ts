import { Component, OnInit, Input, Output } from '@angular/core';
import { CheckBox } from '../check-box/check-box';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input()  public checkData: CheckBox;
  @Input()  public hasEdit: boolean;
  public isComplete: boolean;
  public editMode: boolean = false;
  constructor() { }
  ngOnInit() {
    // console.log('checkData :: ', this.checkData);
    this.isComplete = (this.checkData.Complete == 'Y') ? true : false ;
  }
  changeCompleteState(){ 
    console.log(this.isComplete)
  }
  // changeTitle(){
  //   this.editMode = true;
  // }

}
