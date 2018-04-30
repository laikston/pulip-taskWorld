import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';

@Component({
  selector: 'app-check-list-box',
  templateUrl: './check-list-box.component.html',
  styleUrls: ['./check-list-box.component.css']
})
export class CheckListBoxComponent implements OnInit {
  @ViewChild('checkListName')  public checkListName: ElementRef;
  @Input()  public checkListdata: any;
  @Input()  public hasEdit: boolean;
  @Input()  public hasAddListItem: boolean;  
  public isAddList: boolean = false;  
  public newCheckList: any = {};
  public isCancel: boolean = false;
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService,
  ) { }
  ngOnInit() {
    // console.log('checkListdata :: ', this.checkListdata);
    if(this.hasAddListItem)  this.initNewCheckList();
  }
  private initNewCheckList(){
    this.newCheckList = {
      'Complete': 'N',
      'Idx': 1111,
      'Last_date': '2017-12-02',
      'Level': 3,
      'Name': undefined,
      'Order': 5,
      'Parent_idx': this.checkListdata[0]['Parent_idx'],
      'Reg_date': '2018-12-12'
    };
  }
  openAddCheckListInput(_e){    
    if(this.isCancel == false){
      this.isAddList = true;
      setTimeout(() => this.checkListName.nativeElement.focus(), 0);
    }
  }
  addCheckList(){
    if(this.newCheckList['Name'] == undefined){
      this.isAddList = false;
    }else{
      setTimeout(() => {
        let newCheckList: any = { // dummy
          'Complete': 'N',
          'Idx': 1111,
          'Last_date': '2017-12-02',
          'Level': 3,
          'Name': this.newCheckList['Name'],
          'Order': 5,
          'Parent_idx': this.newCheckList['Parent_idx'],
          'Reg_date': '2018-12-12'
        }, 
        element: HTMLElement = document.getElementById('closeCheckListInputBtn') as HTMLElement;
        this.checkListdata.push(newCheckList);
        this.projectInfoBoxService.setTaskSubData('CheckList', this.checkListdata);
        this.initNewCheckList();
        element.click();
      });
      // this.dataService.addTaskList(this.newTaskList, this.addTaskListComplete, this);
    }
  }
  cancelAddTaskListInput(){  
    this.isCancel = true;
    this.isAddList = false;     
    this.newCheckList['Name'] = undefined;
    setTimeout(() => this.isCancel = false, 100);
  }
  changeCheckData(_e){
    if(this.hasAddListItem){
      this.checkListdata.forEach((val: any, key: number) => {
        if(val['Idx'] == _e.checkData['Idx']){
          if(_e.method == 'update')  this.checkListdata[key] = _e.checkData;
          if(_e.method == 'delete')  this.checkListdata.splice(key, 1);
          this.projectInfoBoxService.setTaskSubData('CheckList', this.checkListdata);
        }
      });
    }
  }
}
