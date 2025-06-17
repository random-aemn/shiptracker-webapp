import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebSocketService} from './services/WebSocketService';
import {Observable, of, Subscription} from 'rxjs';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf} from '@angular/common';
import { CommonModule } from '@angular/common'
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatLabel,
    MatButtonModule,
    MatInput,
    MatFormField,
    NgForOf
  ],
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


  }



  ngOnDestroy() {

  }

  stopWebsocket() {
    // Unsubscribe from WebSocket messages and close the connection
    this.messageSubscription.unsubscribe();
    this.webSocketService.closeConnection();
  }


  subscribeToWebSocket() {
    this.messageSubscription = this.webSocketService.getMessages().subscribe(
      (message) => {
        console.log(message.MMSI);
        console.log("hopefully the data follows...")
        // If the data is an array of objects, console.table will display it in a formatted table
        // console.table(message);

        // Displays an interactive listing of the properties of a specified JavaScript object. This listing lets you use disclosure triangles to examine the contents of child objects.
        console.dir(message);

        this.payload = message;
        this.payloadArray.push(message);

      }

    );

  }






  clearData() {
    // this.stopWebsocket();
    this.payloadArray = [];
  }
}
