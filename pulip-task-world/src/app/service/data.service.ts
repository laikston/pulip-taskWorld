import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '../service/constant.service';

const postOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const deleteOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  body: {}
};
const changeOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class DataService {  
  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) { }
  /* project-list */
  getProjectList(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'list'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { console.log(data);_completeFunc(data, _component); },
      err => console.error(err)
    );
  }

  /* task-list(taskGroup) */
  getTaskList(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'gettasklist'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { console.log('getTaskList :: ', data);_completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  addTaskList(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'tasklist'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  deleteTaskList(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'tasklist');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }  
  changeTaskList(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'tasklist');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 

  /* task */
  addTask(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'task'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  deleteTask(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'task');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }  
  changeTask(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'task');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 

  /* check */
  addCheck(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'check'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  deleteCheck(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'check');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }  
  changeCheck(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'check');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 

  /* member-list */
  getMemberList(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('global', 'member'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  deleteMember(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('global', 'member');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  changeMember(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('global', 'member');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 

  /* tag */
  deleteTag(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('global', 'tag');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  changeTag(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('global', 'tag');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 

  /* date */
  changeStartDate(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('global', 'startDate');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 
  changeEndDate(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('global', 'endDate');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  } 

  /* comment */
  addComment(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'taskcomment'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  deleteComment(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'taskcomment');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
  changeComment(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'taskcomment');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }   

  /* task file */
  addFile(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'taskfile'),
        data = this.http.post(url, params);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }

  deleteFile(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'taskfile');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }

  /* task property */
  changeProperty(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'taskproperty');
    deleteOptions.body = _params;
    data = this.http.put(url, _params, changeOptions);
    data.subscribe(
      data => { _completeFunc(data, _component); },
      err => console.error(err)
    );
  }
}
