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




  // Convert the string representation of  date to Unix representation in seconds -> then filter the array
  // thisArg is the cutoff date, represented in seconds

  filterPositionReportByDate(value: PositionReport1[], key: number , map: Map<number, PositionReport1[]>) {

    //   "!" is a non-null assertion that tells the compiler the value will NOT be null or undefined
    // map.set(key, map.get(key)!.filter(pr => Date.parse(pr.BaseDateTime) > Date.parse(fred)));
    console.log("hey, inside the filter position method - 'this' is: " + this)
    console.info("the key is: " + key);
    // console.log("the value is: " + value);

  };

  ngOnInit() {
    console.log("here I am, in Init");

    this.myFakeDataService.getDataArray();
    let positionReportResponse = this.myFakeDataService.getDataArray() as PositionReport1[];

    console.log(positionReportResponse);

    console.log("This should hold the map representation of the PositionReport1 data");
    let positionReportMap=  this.myFakeDataService.convertArrayToMap(positionReportResponse);

     console.log("XXXXXXXX");
     console.log("XXXXXXXX");
     console.log(positionReportMap);
    console.log("XXXXXXXX");


    console.log();

    const dateObject: Date = new Date("2023-01-01T00:05:17")
    const dateStringThisArg: string = dateObject.toISOString();


    positionReportMap.forEach(this.filterPositionReportByDate);

        console.log(positionReportMap)


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
