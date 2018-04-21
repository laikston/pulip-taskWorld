import { Component, OnInit, Input, Output } from '@angular/core';
import { CheckBox } from '../check-box/check-box';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input()  public checkData: CheckBox;
  constructor() { }
  ngOnInit() {
    console.log('checkData :: ', this.checkData);
  }

}
