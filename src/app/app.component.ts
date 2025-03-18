import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebSocketService} from './services/WebSocketService';
import {Observable, of, Subscription} from 'rxjs';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf} from '@angular/common';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, NgForOf, KeyValuePipe],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {

  public messageSubscription: Subscription = Subscription.EMPTY;


  title = 'RachelTracker';
  payload: any = {};
  payloadArray: any = [];

  xyz: string = '{"MMSI":"367488370","BaseDateTime":"2023-01-01T01:33:29","LAT":"36.78231","LON":"-75.40529","Heading":"208.0","VesselName":"RACHEL"}'

  constructor(private webSocketService: WebSocketService) {
  }


  ngOnInit() {

    this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        console.log(message.MMSI);
       this.payload = message;
       this.payloadArray.push(message);

      }

    );

  }



  ngOnDestroy() {
    // Unsubscribe from WebSocket messages and close the connection
    this.messageSubscription.unsubscribe();
    this.webSocketService.closeConnection();
  }


  // protected readonly of = of;
}
