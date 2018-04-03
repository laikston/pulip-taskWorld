import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ConstantService } from './service/constant.service';
import { SocketService } from "./service/socket.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    public messages: Array<any>;
    public chatBox: string;
    public detailLink: Array<any>;

    public constructor(
        private constantService: ConstantService,
        private socket: SocketService
    ) {
        this.messages = [];
        this.chatBox = "";
    }

    public ngOnInit() {
        this.detailLink = this.constantService.getGnbDetailLinkUrl();
        this.socket.getEventListener().subscribe(event => {
            if(event.type == "message") {
                let data = event.data.content;
                console.log(event.data)
                if(event.data.sender) {
                    data = ": " + data; //event.data.sender + 
                }
                this.messages.push(data);
            }
            if(event.type == "close") {
                this.messages.push("/소캣연결안됨");
            }
            if(event.type == "open") {
                this.messages.push("/소캣연결성공");
            }
        });
    }

    public ngOnDestroy() {
        this.socket.close();
    }

    public send() {
        if(this.chatBox) {
            this.socket.send(this.chatBox);
            this.chatBox = "";
        }
    }

    public isSystemMessage(message: string) {
        return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
    }

}