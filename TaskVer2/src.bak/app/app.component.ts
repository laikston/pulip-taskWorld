import { Component, OnInit } from '@angular/core';
import { ConstantService } from './service/constant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  detailLink: any;
  constructor(
    private constantService: ConstantService
  ) { }
  ngOnInit() {
    this.detailLink = this.constantService.getGnbDetailLinkUrl();
  }
}
