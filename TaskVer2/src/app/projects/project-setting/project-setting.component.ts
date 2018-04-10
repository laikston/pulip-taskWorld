import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ConstantService } from '../../service/constant.service';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent implements OnInit {
  public projectId: number;
  public projectName: string;
  public data: any;
  constructor() { }
  ngOnInit() { }
}
