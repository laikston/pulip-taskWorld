import { Component, OnInit } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { CheckListBoxComponent } from '../check-list-box/check-list-box.component';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { IMyDpOptions } from '../../datepicker-box/interfaces/my-options.interface'; /* angular4-datepicker :: https://www.npmjs.com/package/angular4-datepicker */

@Component({
  selector: 'app-task-property',
  templateUrl: './task-property.component.html',
  styleUrls: ['./task-property.component.css']
})
export class TaskPropertyComponent implements OnInit {
  public projectId: number;
  public projectName: string;
  public taskId: number;
  public data: TaskBox;
  public firedEnterKeyEvent: boolean = false;
  public datePickerOptions: IMyDpOptions = { // date-picker option
    dateFormat: 'yyyy-mm-dd' ,
    editableDateField: false
  }; 
  public startDate: any = { date: { year: 2018, month: 10, day: 9 } };
  public endDate: any = { date: { year: 2018, month: 10, day: 9 } };
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() { 
    setTimeout(() => {
      if(this.projectInfoBoxService.getProjectData())        this.projectName = this.projectInfoBoxService.getProjectData().projectname;
      if(this.data)  this.setDatePickerDates(this.data);
    });  
    this.projectInfoBoxService.getProjectDataEvent.subscribe(_data => {
      this.projectName = this.projectInfoBoxService.getProjectData().projectname;
    });
    this.projectInfoBoxService.getTaskDataEvent.subscribe((_data) => { 
      this.setDatePickerDates(_data);
    });  
  }  
  setDatePickerDates(_data){
    let originStartDate: string = _data['Reg_date'], 
        arrStartDate: any = originStartDate.split('-'), 
        originEndtDate: string = _data['Last_date'], 
        arrEndDate: any = originEndtDate.split('-');              
    this.startDate = {
      date: {
        year : arrStartDate[0],
        month : parseInt(arrStartDate[1]),
        day : parseInt(arrStartDate[2])
      }
    };
    this.endDate = {
      date: {
        year : arrEndDate[0],
        month : parseInt(arrEndDate[1]),
        day : parseInt(arrEndDate[2])
      }
    };
  }
  startDateChanged(_e){
     if(this.data != undefined)  this.data['Reg_date'] = _e.formatted;
  }
  endDateChanged(_e){
    if(this.data != undefined)  this.data['Last_date'] = _e.formatted;
  }
  changeDataContent(_e){
    if(_e){ // 동기화 되는 화면이 없으므로 바로 api처리, sevice에 해당하는 data도 있으므로 service에 넣어줄 것
      this.firedEnterKeyEvent = true;
      this.projectInfoBoxService.setTaskSubData('Content', this.data['Content']);
    }else{
      if(this.firedEnterKeyEvent == false){
        this.projectInfoBoxService.setTaskSubData('Content', this.data['Content']);
      }else{
        this.firedEnterKeyEvent = false;
      }
    }
  }
}
