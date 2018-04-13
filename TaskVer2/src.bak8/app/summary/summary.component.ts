import { Component, OnInit } from '@angular/core';
import { ConstantService } from '../service/constant.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  public gnbTitle: string = 'home';
  public detailLink: Array<any>;
  constructor(
    private constantService: ConstantService
  ) { }

  ngOnInit() {
    this.detailLink = this.constantService.getSnbDetailLinkUrl(this.gnbTitle);
  }

}
