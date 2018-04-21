import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check-list-box',
  templateUrl: './check-list-box.component.html',
  styleUrls: ['./check-list-box.component.css']
})
export class CheckListBoxComponent implements OnInit {
  @Input()  public checkListdata: any;

  constructor() { }
  ngOnInit() {
    console.log('checkListdata :: ', this.checkListdata);
  }

}
