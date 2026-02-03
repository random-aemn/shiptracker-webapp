import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PositionReport1 } from './position-report-1';
import {PositionReport} from './position-report';
import {Browser} from 'leaflet';
import pointer = Browser.pointer;

@Injectable({
  providedIn: 'root'
})
export class MyFakeDataService {

// msgs=[{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}];

//   Test that given a set of these position reports, set the horizon date to: something that precedes the timestamps, something that is after all the timestamps, and
//   a timestamp value that cuts a section of the data set
dataArray: PositionReport1[] = [
  {"mmsi": 1, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  {"mmsi": 1, "BaseDateTime": "2023-01-02T00:05:18", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  {"mmsi": 1, "BaseDateTime": "2023-01-03T00:05:19", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  {"mmsi": 1, "BaseDateTime": "2023-01-04T00:05:20", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},

  {"mmsi": 2, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  {"mmsi": 2, "BaseDateTime": "2023-01-02T00:05:18", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  {"mmsi": 2, "BaseDateTime": "2023-01-03T00:05:19", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  {"mmsi": 2, "BaseDateTime": "2023-01-04T00:05:20", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}
]


  constructor() { }

  // getData(): Observable<PositionReport1[]> {
  //   return of(
  //     [{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  //      {"mmsi": 367488370, "BaseDateTime": "2023-01-02T00:05:18", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  //      {"mmsi": 367488370, "BaseDateTime": "2023-01-03T00:05:19", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  //      {"mmsi": 367488370, "BaseDateTime": "2023-01-04T00:05:20", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}
  //     ]);
  // };

  // oldConvertArrayToMap(msgs: PositionReport1[]): Map<number, PositionReport1[]>{
  //
  //   let map = new Map<number, PositionReport1[]>;
  //
  //   for (let i = 0; i < msgs.length; i++) {
  //     let mappedMMSI = map.get(msgs[i].mmsi) as unknown;
  //     if (mappedMMSI === undefined) {
  //       // The MMSI found in the most recently received position report is not found in the map
  //       //  Set the key and value in the map
  //       let positionReport = msgs[i] as PositionReport1
  //       let positionReportArray: PositionReport1[] = [];
  //       positionReportArray.push(positionReport);
  //       map.set(msgs[i].mmsi, positionReportArray);
  //     }
  //     else {
  //       // The MMSI found in the most recently received position report is in the map
  //       //  Add the position report to the map
  //
  //       let fred: PositionReport1[] = map.get(mappedMMSI as number) as PositionReport1[];
  //       let pr: PositionReport1 = msgs[i] as PositionReport1
  //       if(fred != undefined) {
  //         fred.push(pr);
  //       }
  //       map.set(mappedMMSI as number, fred);
  //
  //     }
  //   }
  //   return map;
  // }

  convertArrayToMap(msgs: PositionReport1[]) : Map<number, PositionReport1[]> {

  let prMap = new Map<number, PositionReport1[]>;
  let horizonDate = new Date();

    prMap.forEach((prArrayData, key) => {
      // console.log(`Key: ${key}, Value: ${value}`);
      // console.log("value" + prArrayData)
      let deletionCount = 0;
      for (let i = 0; i < prArrayData.length; i++) {
        let thisDate = new Date(prArrayData[i].BaseDateTime);
        // console.log("key is " + key + " index is " + i + " horizon date " + horizonDate.toISOString()
        //   + " thisDate " + thisDate.toISOString());
        if (thisDate <= horizonDate) {
          deletionCount++;
          // console.log("DELETE THIS key is " + key + " index is " + i + " horizon date " + horizonDate.toISOString()
          //   + " thisDate " + thisDate.toISOString());
        }
        else
          break;
      }
      if (deletionCount > 0) {
        console.log("slicing from 0 to " + (deletionCount));
        let filteredArr = prArrayData.slice(deletionCount)
        // console.log("filtered array is ")
        // console.dir(filteredArr)
        // If the array no longer contains data, strike the mmsi from the prMap
        if (filteredArr.length === 0) {
          prMap.delete(key);
        }
        else {
          prMap.set(key, filteredArr);
        }
      }
  })

    return prMap;
  }

  getDataArray(): PositionReport1[] {

    return this.dataArray;
  }


}

