import { Component, OnInit } from '@angular/core';
import { TaskBox } from '../task-box/task-box';
import { CheckListBoxComponent } from '../check-list-box/check-list-box.component';
import { MemeberBox } from '../../member-box/member-box';
import { ProjectInfoBoxService } from '../../service/project-info-box.service';
import { DataService } from '../../service/data.service';
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
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false
  }; 
  public todate: any;
  public startDate: any = { date: { year: 2018, month: 10, day: 9 } };
  public endDate: any = { date: { year: 2018, month: 10, day: 9 } };
  public memberData: MemeberBox[];
  constructor(
    private projectInfoBoxService: ProjectInfoBoxService,
    private dataService: DataService
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
    if(this.projectId)  this.dataService.getMemberList({'project_idx':this.projectId}, this.getMemberListComplete, this);
    this.todate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: ''
    };
  }  
  getMemberListComplete(_data, _this){
    _this.memberData = _data;
    _this.memberData.forEach((value: any, key: number) => {
      value.selected = false;      
    });
  }
  setDatePickerDates(_data){   
    let originStartDate: string = _data['Start_date'], 
        originEndDate: string = _data['End_date'], 
        arrStartDate: any = (originStartDate != '') ? originStartDate.split('-') : originStartDate,         
        arrEndDate: any = (originEndDate != '') ? originEndDate.split('-') : originEndDate; 
    this.startDate = {
      date: {
        year : (originStartDate != '') ? arrStartDate[0] : '',
        month : (originStartDate != '') ? parseInt(arrStartDate[1]) : '',
        day : (originStartDate != '') ? parseInt(arrStartDate[2]) : ''
      }
    };
    this.endDate = {
      date: {
        year : (originEndDate != '') ? arrEndDate[0] : '',
        month : (originEndDate != '') ? parseInt(arrEndDate[1]) : '',
        day : (originEndDate != '') ? parseInt(arrEndDate[2]) : ''
      }
    };
  }
  startDateChanged(_e){
    let newStartDate: any = {};
    if(this.data != undefined && _e.formatted != this.data['Start_date']){
      newStartDate['project_idx'] = this.projectId;
      newStartDate['task_idx'] = this.taskId;
      newStartDate['set_date'] = this.data['Start_date'] = _e.formatted;
      this.dataService.changeStartDate(newStartDate, this.changeStartDateComplete, this);      
    }
  }
  changeStartDateComplete(_data, _this){
    console.log(_data);
  }
  endDateChanged(_e){
    let newEndDate: any = {};
    if(this.data != undefined && _e.formatted != this.data['End_date']){
      newEndDate['project_idx'] = this.projectId;
      newEndDate['task_idx'] = this.taskId;
      newEndDate['set_date'] = this.data['End_date'] = _e.formatted;
      this.dataService.changeEndDate(newEndDate, this.changeEndDateComplete, this);      
    }
  }
  changeEndDateComplete(_data, _this){
    console.log(_data);
  }
  changeDataContent(_e, _property){
    _e.preventDefault();
    if(this.firedEnterKeyEvent == true){
      this.firedEnterKeyEvent = false;
    }else{
      this.changeTaskProperty(_property);
    }
  }
  changeTaskProperty(_property){
    let newTask = {
      'project_idx': this.projectId,
      'task_idx': this.taskId,
      'properties': _property
    };
    if(this.firedEnterKeyEvent != true)  this.firedEnterKeyEvent = true;
    this.dataService.changeProperty(newTask, this.changeTaskPropertyComplete, this);
  }
  changeTaskPropertyComplete(_data, _this){
    if(console)  console.log(_data.msg);
  }
}
