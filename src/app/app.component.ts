import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebSocketService} from './services/WebSocketService';
import {filter, Observable, of, Subscription} from 'rxjs';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf} from '@angular/common';
import { CommonModule } from '@angular/common'
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatButtonModule} from '@angular/material/button';
import {mmsiToColor} from '../assets/js/mmsiColorId';
import { JsonReaderService } from './services/json-reader.service';
import { PositionReport } from './position-report';
import { Map as GeographicMap} from './map/map';
import { MyFakeDataService } from './my-fake-data.service';
import { PositionReport1 } from './position-report-1';


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
    GeographicMap
],
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {

  public messageSubscription: Subscription = Subscription.EMPTY;



  title = 'RachelTracker';
  payload: any = {};
  payloadArray: any = [];
  shipList = Map<number, PositionReport[]>

  MAX_NUM_POSITION_REPORTS = 10;


  map = new Map<number, PositionReport[]>();


  constructor(private webSocketService: WebSocketService,
              private jsonReader: JsonReaderService,
              private myFakeDataService: MyFakeDataService) {}





  ngOnInit() {
    console.log("here I am, in Init");

    this.myFakeDataService.getDataArray();
    let testMap = this.myFakeDataService.convertArrayToMap(this.myFakeDataService.getDataArray());

    console.log(testMap);

    // this.myFakeDataService.getDataArray().subscribe(
    //   (data: PositionReport1[]) => {
    //
    //     let reportMap = new Map<number, PositionReport1[]>;
    //
    //     for(let i: number = 0; i < 2; i++){
    //       reportMap.set(i, data)
    //     }
    //
    //
    //     data.forEach(this.filterPositionReportByDate, "2023-01-01T00:05:17");
    //
    //     console.log(data)
    //   }
    // );

    console.log("I ought to be leaving Init");
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
      (messageList: PositionReport[]) => {

        // Displays an interactive listing of the properties of a specified JavaScript object. This listing lets you use disclosure triangles to examine the contents of child objects.
        // message.plotColor = mmsiToColor(message.MMSI);


        for (let message of messageList){
          this.payloadArray.push(message)
          console.log(message);



        }

      }

    );

  }


  clearData() {
    // this.stopWebsocket();
    this.payloadArray = [];
  }


  // Convert the string representation of  date to Unix representation in seconds -> then filter the array
  // thisArg is the cutoff date, represented in seconds

filterPositionReportByDate(value: PositionReport1[], key: number , map: Map<number, PositionReport1[]>, thisArg: string) {

  map.set(key, map.get(key).filter(pr => Date.parse(pr.BaseDateTime) > Date.parse(thisArg)));

};



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
