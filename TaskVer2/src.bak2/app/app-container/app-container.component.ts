import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent implements OnInit {
  @ViewChild('depth1Container', { read: ViewContainerRef }) public depth1Container: ViewContainerRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) { }
  ngOnInit() {
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.depth1contents && data.depth1contents.length > 0){
                data.depth1contents.map(depth1content => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(depth1content);
                  this.depth1Container.createComponent(componentFactory);
                });
              }
           });
  }
}
