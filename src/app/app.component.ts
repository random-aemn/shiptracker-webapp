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
import {mmsiToColor} from '../assets/js/mmsiColorId';



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
        console.log("the color is: " + mmsiToColor(message.MMSI));
        console.log("hopefully the data follows...")
        // If the data is an array of objects, console.table will display it in a formatted table
        // console.table(message);

        // Displays an interactive listing of the properties of a specified JavaScript object. This listing lets you use disclosure triangles to examine the contents of child objects.
        message.plotColor = mmsiToColor(message.MMSI);

        console.dir(message);
        // this.payload = message;
        this.payloadArray.push(message);

      }

    );

  }






  clearData() {
    // this.stopWebsocket();
    this.payloadArray = [];
  }

scaleNumberToHex(input: number) {
    let sourceMin = 0;
    let sourceMax = 99;
    let targetMin = 0;
    let targetMax = 255
    let scaledIntResult = Math.floor((input - sourceMin) * (targetMax - targetMin) / (sourceMax - sourceMin) + targetMin);
    let hexValue = scaledIntResult.toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  }

mmsiToColor(mmsi: string) {
    let hexColor = "";
    let startIdx = 3;
    for (let i = 0; i < 4; i++) {
      let colorBasis = mmsi.toString().substring(startIdx, startIdx + 2);
      hexColor += this.scaleNumberToHex(Number(colorBasis));
      startIdx += 2;
    }

    return `#${hexColor}`;
  }

}
