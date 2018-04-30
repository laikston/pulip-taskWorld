import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from '../service/constant.service';
import { ProjectInfoBoxService } from '../service/project-info-box.service';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent implements OnInit {
  @ViewChild('depth1Container', { read: ViewContainerRef }) public depth1Container: ViewContainerRef;
  public detailLink: Array<any>;
  public childComponent: ComponentRef<any>;
  public currentGnb: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private constantService: ConstantService,
    private projectInfoBoxService: ProjectInfoBoxService
  ) { }
  ngOnInit() {
    this.detailLink = this.constantService.getGnbDetailLinkUrl();
    this.activatedRoute.data
           .subscribe(data => {
              if(!!data && !!data.depth1contents && data.depth1contents.length > 0){
                data.depth1contents.map(depth1content => {
                  let componentFactory = this.componentFactoryResolver.resolveComponentFactory(depth1content);
                  this.childComponent = this.depth1Container.createComponent(componentFactory);
                  let instance = this.childComponent.instance;     
                  this.currentGnb = instance.gnbTitle;
                });
              }
           });    
  }
  initGnb(_link: any){
    if(_link.title == 'projects'){
      this.projectInfoBoxService.setViewInfoEvent(false);
    }
  }
}