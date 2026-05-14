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
import { MyFakeDataService } from './services/my-fake-data.service';
import { GeoMap} from './map/geoMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [MatLabel,
    MatButtonModule,
    MatInput,
    MatFormField,
    NgForOf,
    GeoMap
    ],
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit, OnDestroy {

  public messageSubscription: Subscription = Subscription.EMPTY;
  public positionsReportMap: Map<number, PositionReport[]> = new Map;
  public filteredPositionsReportMap: Map<number, PositionReport[]> = new Map;

  title = 'RachelTracker';
  payload: any = {};
  payloadArray: any = [];
  shipList = Map<number, PositionReport[]>

  MAX_NUM_POSITION_REPORTS = 10;


  constructor(private webSocketService: WebSocketService,
              private jsonReader: JsonReaderService,
              private myFakeDataService: MyFakeDataService) {}




  ngOnInit() {
    console.log("here I am, in Init");

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
      (messageList: PositionReport[]) => { //messageList holds what is returned from the subscription

        let positionReportResponse: PositionReport[] = messageList as PositionReport[]; // asserting that messageList will be an array of PositionReport object

        console.log("The messageList is: " + messageList.length + " long");

        // Append a 'Z' to each timestamp to make it parseable for Typescript
        for(let i = 0; i<positionReportResponse.length; i++){
          positionReportResponse[i].BaseDateTime = positionReportResponse[i].BaseDateTime + "Z";
          console.log("The Response and MMSI for each ship in the positionReportResponse Array follows:");
          console.log(positionReportResponse[i]);
          console.log(positionReportResponse[i].MMSI);
        }

        this.positionsReportMap = this.myFakeDataService.loadPositionReportsFromArray(positionReportResponse)

        console.log("This *should* hold a map representation of the PositionReport data");
        console.log(this.positionsReportMap);

        // Creating filter date based on the *last* record in the array
        let filterDate = new Date(positionReportResponse[positionReportResponse.length - 1].BaseDateTime);

        // Filter the set of position reports by date and assign it to the map
        this.filteredPositionsReportMap = this.myFakeDataService.filterMapByDate(this.positionsReportMap, filterDate);
        console.log("The value of this.filteredPositionsReportMap is: ");
        console.log(this.filteredPositionsReportMap)

        /*
        Leaflet should be able to handle FeatureCollections
        - ours will have multiple point features and a single line-string feature

        Pass the entire this.positionsReportMap, via the service, to map.ts
        Once it is in the map.ts component, I can iterate through, grab the lats/longs, assign them to a variable to generate the ant path
        We can also assign the positionReportMap data to a FeatureCollection to enable the mouseover events
        */

        // Take the lats and longs from each position report and assign it to a variable in the service
        console.log("I'm calling the service.setLatLongsFromMap");
        this.myFakeDataService.setLatLongsFromMap(this.filteredPositionsReportMap);


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

// scaleNumberToHex(input: number) {
//     let sourceMin = 0;
//     let sourceMax = 99;
//     let targetMin = 0;
//     let targetMax = 255
//     let scaledIntResult = Math.floor((input - sourceMin) * (targetMax - targetMin) / (sourceMax - sourceMin) + targetMin);
//     let hexValue = scaledIntResult.toString(16);
//     return hexValue.length === 1 ? "0" + hexValue : hexValue;
//   }

// mmsiToColor(mmsi: string) {
//     let hexColor = "";
//     let startIdx = 3;
//     for (let i = 0; i < 4; i++) {
//       let colorBasis = mmsi.toString().substring(startIdx, startIdx + 2);
//       hexColor += this.scaleNumberToHex(Number(colorBasis));
//       startIdx += 2;
//     }
//
//     return `#${hexColor}`;
//   }

}
