import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoginService {
  constructor() { }

  private memberId: string;
  getMemberIdEvent = new EventEmitter<string>();
  setMemberId(_id: string){
    this.memberId = _id;    
    this.getMemberIdEvent.emit(this.memberId);
  }
  getMemberId(){
    return this.memberId;
  }  
  private memberIdx: number;
  getMemberIdxEvent = new EventEmitter<number>();
  setMemberIdx(_idx: number){
    this.memberIdx = _idx;    
    this.getMemberIdxEvent.emit(this.memberIdx);
  }
  getMemberIdx(){
    return this.memberIdx;
  } 

}
