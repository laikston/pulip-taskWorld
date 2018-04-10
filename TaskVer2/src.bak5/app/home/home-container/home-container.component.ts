import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  @ViewChild('depth2Container', { read: ViewContainerRef }) public depth2Container: ViewContainerRef;
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
