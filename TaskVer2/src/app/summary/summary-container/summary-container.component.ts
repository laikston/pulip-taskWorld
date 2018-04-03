import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.css']
})
export class SummaryContainerComponent implements OnInit {
  @ViewChild('depth2Container', { read: ViewContainerRef }) depth2Container: ViewContainerRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.depth2contents && data.depth2contents.length > 0){
                data.depth2contents.map(depth2content => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(depth2content);
                  this.depth2Container.createComponent(componentFactory);
                });
              }
           });
  }

}
