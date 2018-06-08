import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  constructor() { }
  
  /* api url */
  private baseUrl: string = 'taskapi.pulipinc.com';
  private apiBaseUrl: string = 'http://' + this.baseUrl + '/';
  // private apiBaseUrl: string = 'http://ec2-52-78-187-248.ap-northeast-2.compute.amazonaws.com:4000/api/'
  private apiUrl: any = {
    global : {
      member : this.apiBaseUrl + 'member',
      tag : this.apiBaseUrl + 'tag',
      startDate: this.apiBaseUrl + 'taskStartDate',
      endDate: this.apiBaseUrl + 'taskEndDate'
    },
    projects : {
      list: this.apiBaseUrl + 'getProjectList',
      detail: this.apiBaseUrl + 'getProjectDetail',
      gettasklist: this.apiBaseUrl + 'getData',            
      tasklist: this.apiBaseUrl + 'taskGroup',      
      task: this.apiBaseUrl + 'task',
      taskcomment: this.apiBaseUrl + 'comment',
      taskfile: this.apiBaseUrl + 'file',
      taskproperty: this.apiBaseUrl + 'properties',
      check: this.apiBaseUrl + 'checkList',
    }
  };
  getApiUrl(_gnbTitle, _sectionTitle){
    return this.apiUrl[_gnbTitle][_sectionTitle];
  }

  /* socket url */
  private socketBaseUrl: string = 'ws://' + this.baseUrl + ':7001/ws?id='; // projectId
  getSockeBasetUrl(){
    return this.socketBaseUrl;
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
        link : '/home/task',
        title : '업무'
      },
      {
        link : '/home/feedback',
        title : '피드백'
      }
    ],
    summary: [
      {
        link : '/summary/task',
        title : '업무'
      },
      {
        link : '/summary/calendar',
        title : '캘린더'
      },
      {
        link : '/summary/timeline',
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