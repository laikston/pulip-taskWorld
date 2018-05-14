import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SocketService {

    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor() {
        this.socket = new WebSocket("ws://ec2-52-78-187-248.ap-northeast-2.compute.amazonaws.com:4000/ws");
        this.socket.onopen = event => {
            this.listener.emit({"type": "open", "data": event});
        }
        this.socket.onclose = event => {
            this.listener.emit({"type": "close", "data": event});
        }
        this.socket.onmessage = event => {
            this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
        }
    }

    public send(data: string) {
        this.socket.send(data);
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }

}