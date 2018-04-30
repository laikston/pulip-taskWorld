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
const updateOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class DataService {
  
  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) { }
  getProjectList(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'list'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => {
        console.log(data)
      },
      err => console.error(err),
      () => data.subscribe(
        data => {
          _completeFunc(data, _component);
        }
      )
    );
  }
  addTaskList(_params, _completeFunc, _component) {
    let params = _params,
        url = this.constantService.getApiUrl('projects', 'tasklist'),
        data = this.http.post(url, params, postOptions);
    data.subscribe(
      data => {
        console.log(data)
      },
      err => console.error(err),
      () => data.subscribe(
        data => {
          _completeFunc(data, _component);
        }
      )
    );
  }
  deleteTaskList(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'tasklist');
    deleteOptions.body = _params;
    data = this.http.delete(url, deleteOptions);
    data.subscribe(
      data => {
        console.log(data)
      },
      err => console.error(err),
      () => data.subscribe(
        data => {
          _completeFunc(data, _component);
        }
      )
    );
  }  
  updateTaskList(_params, _completeFunc, _component) {
    let params = _params, data,
        url = this.constantService.getApiUrl('projects', 'tasklist');
    deleteOptions.body = _params;
    data = this.http.put(url, _params ,updateOptions);
    data.subscribe(
      data => {
        console.log(data)
      },
      err => console.error(err),
      () => data.subscribe(
        data => {
          _completeFunc(data, _component);
        }
      )
    );
  } 
}
