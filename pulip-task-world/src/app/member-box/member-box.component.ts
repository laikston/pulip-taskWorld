import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-box',
  templateUrl: './member-box.component.html',
  styleUrls: ['./member-box.component.css']
})
export class MemberBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  noBubbling(_e){
    _e.stopPropagation();
  }
}
