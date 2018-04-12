import { Injectable, EventEmitter } from '@angular/core';
import { TaskListBox } from '../projects/task-list-box/task-list-box';

@Injectable()
export class ProjectInfoBoxService {
  constructor() { }
  private projectId: number;
  getProjectIdEvent = new EventEmitter();
  setProjectId(_id){
    this.projectId = _id;    
    this.getProjectIdEvent.emit(_id);
  }
  getProjectId(){
    return this.projectId;
  }
  private projectName: string;
  getProjectNameEvent = new EventEmitter();
  setProjectName(_name){
    this.projectName = _name;    
    this.getProjectNameEvent.emit(_name);
  }
  getProjectName(){
    return this.projectName;
  }
  filterProjectName(_data: any, _projectId: number, _this: any){
    _data.forEach((value: any, key: number) => {
      if(value.projectid == _projectId){
        _this.projectName = value.projectname;
        _this.projectInfoBoxService.setProjectName(value.projectname);
      }
    });
  }
  private taskId: number;
  getTaskIdEvent = new EventEmitter();
  setTaskId(_id){
    this.taskId = _id;
    this.getTaskIdEvent.emit(_id);
  }
  getTaskId(){
    return this.taskId;
  }
  private taskName: string;
  getTaskNameEvent = new EventEmitter();
  setTaskName(_name){
    this.taskName = _name;
    this.getTaskNameEvent.emit(_name);
  }
  getTaskName(){
    return this.taskName;
  }
  private infoBoxType: string;
  getInfoBoxTypeEvent = new EventEmitter();
  setInfoBoxType(_type){
    this.infoBoxType = _type;
    this.getInfoBoxTypeEvent.emit(_type);
  }
  getInfoBoxType(){
    return this.infoBoxType;
  }
  private currentPage: string;
  getCurrentPageEvent = new EventEmitter();
  setCurrentPage(_pageTitle){
    this.currentPage = _pageTitle;
    this.getCurrentPageEvent.emit(_pageTitle);
  }
  getCurrentPage(){
    return this.currentPage;
  }
  private currentSnb: string;
  getCurrentSnbEvent = new EventEmitter();
  setCurrentSnb(_snbTitle){
    this.currentSnb = _snbTitle;
    this.getCurrentSnbEvent.emit(_snbTitle);
  }
  getCurrentSnb(){
    return this.currentSnb;
  }
  private infoBoxData: TaskListBox;
  getInfoBoxDataEvent = new EventEmitter();
  setInfoBoxData(_data){
    this.infoBoxData = _data;
    this.getInfoBoxDataEvent.emit(this.infoBoxData);
  }
  getInfoBoxData(){
    return this.infoBoxData;
  }
  filterInfoBoxData(_data: TaskListBox[], _type: string, _projectId: number, _taskId: number){
    let projectData: TaskListBox, data: TaskListBox;
    _data.forEach((val: any, key: any) => {
      if(val.Parent_idx == Number(_projectId)){
        if(_type == 'project'){
          data = val;
        }else{
          projectData = val;
          projectData['Task'].forEach((v :any, k: any) => {
            if(v.Idx == Number(_taskId)){
              data = v;
            }          
          });
        }
      }      
    });
    return data;
  }
}
