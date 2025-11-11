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
import { Map } from "./map/map";
import { JsonReaderService } from './services/json-reader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatLabel,
    MatButtonModule,
    MatInput,
    MatFormField,
    NgForOf,
    Map
],
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {

  public messageSubscription: Subscription = Subscription.EMPTY;


  title = 'RachelTracker';
  payload: any = {};
  payloadArray: any = [];


  constructor(private webSocketService: WebSocketService,
              private jsonReader: JsonReaderService) {}


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
      (messageList) => {
   
        // Displays an interactive listing of the properties of a specified JavaScript object. This listing lets you use disclosure triangles to examine the contents of child objects.
        // message.plotColor = mmsiToColor(message.MMSI);

        for (let message of messageList){
          this.payloadArray.push(message)
        }
        // this.payloadArray.push(message);

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
