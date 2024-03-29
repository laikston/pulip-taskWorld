import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-check-list-box',
  templateUrl: './check-list-box.component.html',
  styleUrls: ['./check-list-box.component.css']
})
export class CheckListBoxComponent implements OnInit {
  @ViewChild('checkListName')  public checkListName: ElementRef;
  @Input()  public checkListdata: Array<any>;
  @Input()  public hasEdit: boolean;
  @Input()  public hasAddListItem: boolean;  
  @Input()  public projectId: number;  
  @Input()  public taskId: number;  
  public isAddList: boolean = false;  
  public newCheckList: any = {};
  public isCancel: boolean = false;         
  public noCompleteCheckListData: Array<any> = [];                                  
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService,
    private dataService: DataService
  ) { }
  ngOnInit() {
    // console.log('checkListdata :: ', this.checkListdata);
    if(this.hasAddListItem)  this.initNewCheckList();
    this.noCompleteCheckListData = [];
    if(this.checkListdata != null){
      this.checkListdata.forEach((val: any, key: number) => {
        if(val['Complete'] == 'N')  this.noCompleteCheckListData.push(val);
      });
    }
  }
  private initNewCheckList(){
    // this.newCheckList = {
    //   'Complete': 'N',
    //   'Idx': 1111,
    //   'Last_date': '2017-12-02',
    //   'Level': 3,
    //   'Name': undefined,
    //   'Order': 5,
    //   'Parent_idx': (this.checkListdata[0]) ? this.checkListdata[0]['Parent_idx'] : undefined,
    //   'Reg_date': '2018-12-12'
    // };
  }
  openAddCheckListInput(_e){    
    if(this.isCancel == false){
      this.isAddList = true;
      setTimeout(() => this.checkListName.nativeElement.focus(), 0);
    }
  }
  addCheckList(){
    let newCheckList: any = {}, element: HTMLElement;
    if(this.newCheckList['Name'] == undefined){
      this.isAddList = false;
    }else{
      element = document.getElementById('closeCheckListInputBtn') as HTMLElement;
      newCheckList = {
        'project_idx': this.projectId,
        'task_idx': this.taskId,
        'checklist_name': this.newCheckList['Name'],
        'order_no': 10
      };
      this.dataService.addCheck(newCheckList, this.addCheckListComplete, this);
    }
  }
  addCheckListComplete(_data, _this){
    let element: HTMLElement = document.getElementById('closeCheckListInputBtn') as HTMLElement;
    element.click();
    _this.initNewCheckList();
    console.log(_data.msg);
  }
  cancelAddTaskListInput(){  
    this.isCancel = true;
    this.isAddList = false;     
    this.newCheckList['Name'] = undefined;
    setTimeout(() => this.isCancel = false, 100);
  }
  changeCheckData(_e){
    this.noCompleteCheckListData = [];
    if(this.hasAddListItem){
      this.checkListdata.forEach((val: any, key: number) => {
        if(val['Idx'] == _e.checkData['Idx']){
          if(_e.method == 'update')  this.checkListdata[key] = _e.checkData;
          if(_e.method == 'delete')  this.checkListdata.splice(key, 1);
          this.projectInfoBoxService.setTaskSubData('CheckList', this.checkListdata);
        }
      });
    }
    this.checkListdata.forEach((val: any, key: number) => {
      if(val['Complete'] === 'N')  this.noCompleteCheckListData.push(val);
    });
  }
  countingList(_isComplete, _idx){
    let isView: boolean = (_isComplete == 'N') ? true : false; 
    this.noCompleteCheckListData = [];
    this.checkListdata.forEach((val: any, key: number) => {
      if(val['Complete'] === 'N')  this.noCompleteCheckListData.push(val);
    });
    if(this.noCompleteCheckListData.length > 3){
      this.noCompleteCheckListData.forEach((value: any, key: number) => {
        if(_idx == value['Idx']){
          isView = (key < 3) ? true : false;
        }
      });
    }
    return isView;
  }
}