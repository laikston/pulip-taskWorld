import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  noBubbling(_e){
    _e.stopPropagation();
  }

}
