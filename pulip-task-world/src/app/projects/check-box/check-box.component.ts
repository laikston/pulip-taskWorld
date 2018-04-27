import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { CheckBox } from '../check-box/check-box';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input()  public checkData: CheckBox;
  @Input()  public hasEdit: boolean;
  @Output()  public changeCheckDataEvent = new EventEmitter<any>();
  public isComplete: boolean;
  constructor( ) { }
  ngOnInit() {
    // console.log('checkData :: ', this.checkData);
  }
  changeCheckBoxContent(_e, _item: string){ 
    let data: any = {};
    if(_item){
      data.method = 'update';
      if(_item == 'Complete'){
        if(this.checkData['Complete'] == 'Y'){
          this.checkData['Complete'] = 'N';
        }else{
          this.checkData['Complete'] = 'Y';
        }
      }
    }else{
      data.method = 'delete';
    }
    if(_e.key == 'Enter'){
        let element: HTMLElement = document.querySelector('#focusoutInput') as HTMLElement;
        element.focus();
    }
    data.checkData = this.checkData;
    this.changeCheckDataEvent.emit(data);
  }
}