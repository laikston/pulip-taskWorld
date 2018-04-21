import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '../service/constant.service';


const httpOptions = {
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
        data = this.http.post(url, params, httpOptions);
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
