import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {PositionReport} from '../position-report';
import {Browser, LatLng} from 'leaflet';
import pointer = Browser.pointer;

@Injectable({
  providedIn: 'root'
})
export class MyFakeDataService {

  // mapArr is [latitude, longitude]
  latLong!: [number, number];


  constructor() { }

  setLatLongsFromMap(aPositionReportMap: Map<number, PositionReport[]>){

    // let mapArr = [];
    for (const [key, value] of aPositionReportMap) {
      console.log(`Key: ${key}, Value: ${value}`);


      let coordinates: [number, number];

      for(let pr of value){
        coordinates = [pr.LAT, pr.LON];
        // this.latLong.push(coordinates);
        this.latLong.push(pr.LAT, pr.LON);

      }
  
    }
        console.log("Below is this.latLong AKA the array holding the pairs of lats/longs");
        console.log(this.latLong);
  
  }

  getLatLongsFromMap(): [number, number] {
    return this.latLong;

  }

  // getData(): Observable<PositionReport[]> {
  //   return of(
  //     [{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  //      {"mmsi": 367488370, "BaseDateTime": "2023-01-02T00:05:18", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  //      {"mmsi": 367488370, "BaseDateTime": "2023-01-03T00:05:19", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
  //      {"mmsi": 367488370, "BaseDateTime": "2023-01-04T00:05:20", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}
  //     ]);
  // };

  // oldConvertArrayToMap(msgs: PositionReport[]): Map<number, PositionReport[]>{
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


  loadPositionReportsFromArray(prArr: PositionReport[]): Map<number, PositionReport[]>{

  let prMap = new Map<number, PositionReport[]>();

    // Now, load the array of position reports into the data map
    for (let i = 0; i < prArr.length; i++) {
      const existingArray = prMap.get(prArr[i].MMSI) ?? []; // ?? is the nullish coalescing operator - the fallback value is an empty array
      // 2. Add the new element to the array
      existingArray.push(prArr[i]);

      // 3. Update the map with the modified array (even if the key was new)
      prMap.set(prArr[i].MMSI, existingArray);
    }

    return prMap;

  }

  // THEN TEST THE FILTER FUNCTION
  filterMapByDate(prMap: Map<number, PositionReport[]>, inHorizonDate: Date) : Map<number, PositionReport[]> {

  // Need to convert the test array to a map structure

  // Records with a BaseDateTime equal to or before to horizonDate will be deleted
  // let horizonDate = new Date("2023-01-01T00:05:18Z");

    prMap.forEach((prArrayData, key) => {
      // console.log(`Key: ${key}, Value: ${value}`);
      // console.log("value" + prArrayData)
      let deletionCount = 0;
      for (let i = 0; i < prArrayData.length; i++) {
        let thisDate = new Date(prArrayData[i].BaseDateTime);
        // console.log("key is " + key + " index is " + i + " horizon date " + inHorizonDate.toISOString()
        //   + " thisDate " + thisDate.toISOString());
        if (thisDate <= inHorizonDate) {
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

  // getDataArray(): PositionReport[] {
  //
  //   return this.dataArray;
  // }


}

