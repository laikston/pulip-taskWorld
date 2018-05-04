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
  public memberData: Array<any> = [
    {id: 0, name: 'UITeam', team: '연구소', role: '', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 1, name: 'Dev Team', team: '연구소', role: '', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 2, name: 'DX Group', team: '', role: '', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 3, name: 'Ops Team', team: '연구소', role: '운영팀', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 4, name: '안정화', team: '', role: '', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 5, name: '유용관', team: '연구소', role: '선임', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 6, name: '이 성헌', team: '연구소', role: '이사', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 7, name: '충한 이', team: '연구소', role: '', img: '../assets/images/member-sample-img.jpg', selected: false},
    {id: 8, name: '한대범', team: '연구소', role: '', img: '../assets/images/member-sample-img.jpg', selected: false}
  ];
  public tagData: Array<any> = [
    {id: 0, name: '강묘정', selected: false, group: 'green'},
    {id: 1, name: '김경희', selected: false, group: 'red'},
    {id: 2, name: '강민성', selected: false, group: 'blue'},
    {id: 3, name: '김나현', selected: false, group: 'rainbow'},
    {id: 4, name: '김은주', selected: false, group: 'yellow'},
    {id: 5, name: '김종수', selected: false, group: 'navy'},
    {id: 6, name: '김종환', selected: false, group: 'red'},
    {id: 7, name: '김진원', selected: false, group: 'navy'},
    {id: 8, name: '박정문', selected: false, group: 'rainbow'},
    {id: 9, name: '안노기', selected: false, group: 'green'},
    {id: 10, name: '유용관', selected: false, group: 'brown'},
    {id: 11, name: '윤정호', selected: false, group: 'rainbow'},
    {id: 12, name: '이상화', selected: false, group: 'purple'},
    {id: 13, name: '이성헌', selected: false, group: 'rainbow'},
    {id: 14, name: '전상돈', selected: false, group: 'purple'},
    {id: 15, name: '정덕영', selected: false, group: 'blue'},
    {id: 16, name: '조한필', selected: false, group: 'green'}
  ];
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
