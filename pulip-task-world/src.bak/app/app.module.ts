import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component }  from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppContainerComponent } from './app-container/app-container.component';

import { CommonService } from './service/common.service';
import { ConstantService } from './service/constant.service';
import { DataService } from './service/data.service';
import { ProjectInfoBoxService } from './service/project-info-box.service';
import { SocketService } from './service/socket.service';

import { HomeComponent } from './home/home.component';
import { HomeContainerComponent } from './home/home-container/home-container.component';
import { HomeFeedbackComponent } from './home/home-feedback/home-feedback.component';
import { HomeTaskComponent } from './home/home-task/home-task.component';
import { SummaryComponent } from './summary/summary.component';
import { SummaryContainerComponent } from './summary/summary-container/summary-container.component';
import { SummaryTaskComponent } from './summary/summary-task/summary-task.component';
import { SummaryCalendarComponent } from './summary/summary-calendar/summary-calendar.component';
import { SummaryTimelineComponent } from './summary/summary-timeline/summary-timeline.component';
import { ProjectsComponent } from './projects/projects.component';
import { InfoBoxComponent } from './projects/info-box/info-box.component';
import { InfoBoxContainerComponent } from './projects/info-box-container/info-box-container.component';
import { ProjectActivityComponent } from './projects/project-activity/project-activity.component';
import { ProjectAnalysisComponent } from './projects/project-analysis/project-analysis.component';
import { ProjectContainerComponent } from './projects/project-container/project-container.component';
import { ProjectFileComponent } from './projects/project-file/project-file.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectListBoxComponent } from './projects/project-list-box/project-list-box.component';
import { ProjectListHeaderBoxComponent } from './projects/project-list-header-box/project-list-header-box.component';
import { ProjectSettingComponent } from './projects/project-setting/project-setting.component';
import { ProjectTaskComponent } from './projects/project-task/project-task.component';
import { ProjectTimelineComponent } from './projects/project-timeline/project-timeline.component';
import { TaskCommentComponent } from './projects/task-comment/task-comment.component';
import { TaskFileComponent } from './projects/task-file/task-file.component';
import { TaskPropertyComponent } from './projects/task-property/task-property.component';
import { TaskListBoxComponent } from './projects/task-list-box/task-list-box.component';
import { TaskBoxComponent } from './projects/task-box/task-box.component';
import { CheckListBoxComponent } from './projects/check-list-box/check-list-box.component';
import { CheckBoxComponent } from './projects/check-box/check-box.component';

import { OrderByPipe } from './pipe/order-by.pipe';

let projectInfoBoxTypeProjectDetail:Routes = [
  {
    path: ':projectId/setting',
    component: InfoBoxContainerComponent,
    data : {
      infoBoxcontents : [
        ProjectSettingComponent
      ]
    }
  },
  {
    path: ':projectId/activity',
    component: InfoBoxContainerComponent,
    data : {
      infoBoxcontents : [
        ProjectActivityComponent
      ]
    }
  }
];
let taskInfoBoxTypeProjectDetail:Routes = [
  {
    path: 'setting',
    component: InfoBoxContainerComponent,
    data : {
      infoBoxcontents : [
        ProjectSettingComponent
      ]
    }
  },
  {
    path: 'activity',
    component: InfoBoxContainerComponent,
    data : {
      infoBoxcontents : [
        ProjectActivityComponent
      ]
    }
  }
];
const appRoutes: Routes = [
  { 
    path: '',   
    redirectTo: '/projects/list', 
    pathMatch: 'full' 
  },
  { 
    path: 'home',
    component: AppContainerComponent,  
    data: {
      depth1contents : [
        HomeComponent
      ]
    },
    children: [
      { 
        path: '',   
        redirectTo: '/home/task', 
        pathMatch: 'full' 
      },
      {
        path: 'task',
        component: HomeContainerComponent,
        data : {
          depth2contents : [
            HomeTaskComponent
          ]
        }
      },
      {
        path: 'feedback',
        component: HomeContainerComponent,
        data : {
          depth2contents : [
            HomeFeedbackComponent
          ]
        }
      }
    ]
  },
  { 
    path: 'summary',
    component: AppContainerComponent,  
    data: {
      depth1contents : [
        SummaryComponent
      ]
    },
    children: [
      { 
        path: '',   
        redirectTo: '/summary/task', 
        pathMatch: 'full' 
      },
      {
        path: 'task',
        component: SummaryContainerComponent,
        data : {
          depth2contents : [
            SummaryTaskComponent
          ]
        }
      },
      {
        path: 'calendar',
        component: SummaryContainerComponent,
        data : {
          depth2contents : [
            SummaryCalendarComponent
          ]
        }
      },
      {
        path: 'timeline',
        component: SummaryContainerComponent,
        data : {
          depth2contents : [
            SummaryTimelineComponent
          ]
        }
      }
    ]
  },
  { 
    path: 'projects',
    component: AppContainerComponent,  
    data: {
      depth1contents : [
        ProjectsComponent
      ]
    },
    children: [
      { 
        path: '',   
        redirectTo: '/projects/list', 
        pathMatch: 'full' 
      },
      {
        path: 'list',
        component: ProjectContainerComponent,
        data : {
          depth2contents : [
            ProjectListComponent
          ]
        },
        children: projectInfoBoxTypeProjectDetail
      },
      {
        path: 'project/:projectId/task',
        component: ProjectContainerComponent,
        data : {
          depth2contents : [
            ProjectTaskComponent
          ]
        },
        children: [
          taskInfoBoxTypeProjectDetail[0],
          taskInfoBoxTypeProjectDetail[1],
          {
            path: ':taskId/property',
            component: InfoBoxContainerComponent,
            data : {
              infoBoxcontents : [
                TaskPropertyComponent
              ]
            }
          },
          {
            path: ':taskId/comment',
            component: InfoBoxContainerComponent,
            data : {
              infoBoxcontents : [
                TaskCommentComponent
              ]
            }
          },
          {
            path: ':taskId/file',
            component: InfoBoxContainerComponent,
            data : {
              infoBoxcontents : [
                TaskFileComponent
              ]
            }
          }
        ]
      },
      {
        path: 'project/:projectId/timeline',
        component: ProjectContainerComponent,
        data : {
          depth2contents : [
            ProjectTimelineComponent
          ]
        },
        children: taskInfoBoxTypeProjectDetail
      },
      {
        path: 'project/:projectId/analysis',
        component: ProjectContainerComponent,
        data : {
          depth2contents : [
            ProjectAnalysisComponent
          ]
        },
        children: taskInfoBoxTypeProjectDetail
      },
      {
        path: 'project/:projectId/file',
        component: ProjectContainerComponent,
        data : {
          depth2contents : [
            ProjectFileComponent
          ]
        },
        children: taskInfoBoxTypeProjectDetail
      }      
    ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
    HomeComponent,
    HomeContainerComponent,
    HomeFeedbackComponent,
    HomeTaskComponent,    
    SummaryComponent,    
    SummaryContainerComponent ,
    SummaryTaskComponent,
    SummaryCalendarComponent,
    SummaryTimelineComponent,    
    ProjectsComponent,
    InfoBoxComponent,
    InfoBoxContainerComponent,
    ProjectActivityComponent,
    ProjectAnalysisComponent,
    ProjectContainerComponent,
    ProjectFileComponent,
    ProjectListComponent,
    ProjectListBoxComponent,
    ProjectListHeaderBoxComponent,
    ProjectSettingComponent,
    ProjectTaskComponent,
    ProjectTimelineComponent,
    TaskCommentComponent,
    TaskFileComponent,
    TaskPropertyComponent,
    TaskListBoxComponent,
    TaskBoxComponent,
    CheckListBoxComponent,
    CheckBoxComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CommonService,
    ConstantService,
    DataService,
    ProjectInfoBoxService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }