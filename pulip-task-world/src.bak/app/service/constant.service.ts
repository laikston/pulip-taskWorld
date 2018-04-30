import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  constructor() { }
  /* api url */
  private apiBaseUrl: string = 'https://taskapi.pulipinc.com/'
  private apiUrl: any = {
    projects : {
      list: this.apiBaseUrl + 'getprojectlist',
      detail: this.apiBaseUrl + 'getProjectDetail',      
      tasklist: this.apiBaseUrl + 'taskgroup',
      task: this.apiBaseUrl + 'task'
    }
  };
  getApiUrl(_gnbTitle, _sectionTitle){
    return this.apiUrl[_gnbTitle][_sectionTitle];
  }

  /* link url */
  private linkUrl: any = {
    projects : {
      base: '/projects/',
      project: 'list/',
      task: 'project/',
      taskDetail: '/task/'
    }
  };
  getLinkUrl(_gnbTitle){
    return this.linkUrl[_gnbTitle];
  }
  private gnbDetailLinkUrl: any =  [
    {
      link : '/home',
      title : 'home'
    },
    {
      link : '/summary',
      title : 'summary'
    },
    {
      link : '/projects',
      title : 'projects'
    },
  ];
  getGnbDetailLinkUrl(){
    return this.gnbDetailLinkUrl;
  }
  private snbDetailLinkUrl: any = {
    home: [
      {
        link : '/task',
        title : '업무'
      },
      {
        link : '/feedback',
        title : '피드백'
      }
    ],
    summary: [
      {
        link : '/task',
        title : '업무'
      },
      {
        link : '/calendar',
        title : '캘린더'
      },
      {
        link : '/timeline',
        title : '타임라인'
      }
    ],
    projects: [
      {
        link : '/task',
        title : '업무'
      },
      {
        link : '/timeline',
        title : '타임라인'
      },
      {
        link : '/analysis',
        title : '분석'
      },
      {
        link : '/file',
        title : '파일'
      }
    ]
  };
  getSnbDetailLinkUrl(_gnbTitle){
    return this.snbDetailLinkUrl[_gnbTitle];
  }
  private projectInfoBoxDetailLinkUrl: object = {
    project : [
      {
        link : '/setting',
        title : '정보'
      }
      // {
      //   link : '/setting',
      //   title : '설정'
      // },
      // {
      //   link : '/activity',
      //   title : '모든활동'
      // }
    ],
    task : [
      {
        link : '/property',
        title : '속성'
      },
      {
        link : '/comment',
        title : '댓글'
      },
      {
        link : '/file',
        title : '파일'
      }
    ]
  };
  getProjectInfoBoxDetailLinkUrl(){
    return this.projectInfoBoxDetailLinkUrl;
  }

}
