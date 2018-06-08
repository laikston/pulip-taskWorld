import { Injectable, EventEmitter } from '@angular/core';
import { ConstantService } from '../service/constant.service';

@Injectable()
export class SocketService {
    public constructor(
        private constantService: ConstantService
    ) {}
    private socket: WebSocket;
    private socketEvent: EventEmitter<any> = new EventEmitter();
    private url: string = this.constantService.getSockeBasetUrl();
    public open(_id){
        let url: string = this.url + _id;
        this.socket = new WebSocket(url);
        this.socket.onopen = event => {
            this.socketEvent.emit({"type": "open", "data": event});
        }
        this.socket.onclose = event => {
            this.socketEvent.emit({"type": "close", "data": event});
        }
        this.socket.onmessage = event => {
            this.socketEvent.emit({"type": "message", "data": JSON.parse(event.data)});
        }
    }
    public send(_data: string) {
        this.socket.send(_data);
    }
    public close() {
        this.socket.close();
    }
    public getData() {
        return this.socketEvent;
    }
}