import { Injectable, EventEmitter } from '@angular/core';
import { TaskListBox } from '../projects/task-list-box/task-list-box';
import { TaskBox } from '../projects/task-box/task-box';

@Injectable()
export class ProjectInfoBoxService {
  constructor() { }
  getViewInfoEvent = new EventEmitter<boolean>();
  setViewInfoEvent(_isView){
    this.getViewInfoEvent.emit(_isView);
  }
  private projectListData: Array<any> = [];
  getProjectListDataEvent = new EventEmitter<any>();
  setProjectListData(_dataList: Array<any>){
    this.projectListData = _dataList;
    this.getProjectListDataEvent.emit(this.projectListData);
  }
  getProjectListData(){
    return this.projectListData;
  }
  private projectId: number;
  getProjectIdEvent = new EventEmitter<number>();
  setProjectId(_id){
    this.projectId = _id;    
    this.getProjectIdEvent.emit(_id);
  }
  getProjectId(){
    return this.projectId;
  }  
  private projectData: any = {};
  getProjectDataEvent = new EventEmitter<any>();
  setProjectData(_data){
    this.projectData = _data;  
    this.getProjectDataEvent.emit(this.projectData);
  }
  getProjectData(){
    return this.projectData;
  }
  filterProjectData(_data: any, _projectId: number){
    _data.forEach((value: any, key: number) => {
      if(value.projectid == _projectId){
        this.projectData = value;
        this.setProjectData(value);        
      }
    });
    return this.projectData;
  }
  private taskId: number;
  getTaskIdEvent = new EventEmitter<number>();
  setTaskId(_id){
    this.taskId = _id;
    this.getTaskIdEvent.emit(_id);
  }
  getTaskId(){
    return this.taskId;
  }
  private taskData: TaskListBox;
  getTaskDataEvent = new EventEmitter<TaskListBox>();
  setTaskData(_data){
    this.taskData = _data;
    this.getTaskDataEvent.emit(_data);
  }
  getTaskData(){
    return this.taskData;
  }
  filterTaskData(_data: TaskListBox[], _type: string, _projectId: number, _taskId: number){  
    _data.forEach((value: TaskListBox, key: number) => {
      if(value.Parent_idx == Number(_projectId)){
        value['Task'].forEach((v: any, k: number) => {
          if(v.Idx == Number(_taskId)){
            this.setTaskData(v);
          }          
        });
      }
    });
    return this.taskData;
  }
  private infoBoxType: string;
  getInfoBoxTypeEvent = new EventEmitter<string>();
  setInfoBoxType(_type){
    this.infoBoxType = _type;
    this.getInfoBoxTypeEvent.emit(_type);
  }
  getInfoBoxType(){
    return this.infoBoxType;
  }
  private currentPage: string;
  getCurrentPageEvent = new EventEmitter<string>();
  setCurrentPage(_pageTitle){
    this.currentPage = _pageTitle;
    this.getCurrentPageEvent.emit(_pageTitle);
  }
  getCurrentPage(){
    return this.currentPage;
  }
  private currentSnb: string;
  getCurrentSnbEvent = new EventEmitter<string>();
  setCurrentSnb(_snbTitle){
    this.currentSnb = _snbTitle;
    this.getCurrentSnbEvent.emit(_snbTitle);
  }
  getCurrentSnb(){
    return this.currentSnb;
  }
}