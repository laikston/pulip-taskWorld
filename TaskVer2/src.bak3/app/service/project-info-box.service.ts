import { Injectable, EventEmitter } from '@angular/core';

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
  private taskId: number;
  getTaskIdEvent = new EventEmitter();
  setTaskId(_id){
    this.taskId = _id;
    this.getTaskIdEvent.emit(_id);
  }
  getTaskId(){
    return this.taskId;
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
  private infoBoxData: any;
  getInfoBoxDataEvent = new EventEmitter();
  setInfoBoxData(_data){
    this.infoBoxData = _data;
    this.getInfoBoxDataEvent.emit(_data);
  }
  getInfoBoxData(){
    return this.infoBoxData;
  }
}
