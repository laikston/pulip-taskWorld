import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../service/constant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gnbTitle: string = 'home';
  detailLink: any; 
  constructor(
    private constantService: ConstantService
  ) { }

  ngOnInit() {
    this.detailLink = this.constantService.getSnbDetailLinkUrl(this.gnbTitle); 
  }

}
