import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebSocketService} from './services/WebSocketService';
import {Observable, of, Subscription} from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {

  // messages: any[] = [];
  messages: Observable<any>[] = [];
  // crap: Observable<string> | undefined;
  // crap2: string = "";
  private messageSubscription: Subscription = Subscription.EMPTY;
  // private messageSubscription: Observable<any>;


  title = 'RachelTracker';

  constructor(private webSocketService: WebSocketService) {
  }


  ngOnInit() {
  //   Subscribe to messages from the Websocket
    this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        // this.crap2 = new Date().toString();
        // this.crap = of(this.crap2);
        // this.messages.push(new Date().toString());
      this.messages.push(message);

        // console.log(message);
        console.log(this.messages.length)
        console.log(this.messages[this.messages.length -1])
        // console.log("logging....")
      }

    );
    // console.log("logging the first time ngOnInit does its thing")

  }



  ngOnDestroy() {
    // Unsubscribe from WebSocket messages and close the connection
    this.messageSubscription.unsubscribe();
    this.webSocketService.closeConnection();
  }


  protected readonly of = of;
}
