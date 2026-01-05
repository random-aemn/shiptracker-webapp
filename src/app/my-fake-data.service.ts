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

msgs=[{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}];

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

  getData(): Observable<PositionReport1[]> {
    return of(
      [{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
       {"mmsi": 367488370, "BaseDateTime": "2023-01-02T00:05:18", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
       {"mmsi": 367488370, "BaseDateTime": "2023-01-03T00:05:19", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
       {"mmsi": 367488370, "BaseDateTime": "2023-01-04T00:05:20", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}
      ]);
  };

  convertArrayToMap(msgs: PositionReport1[]): Map<number, PositionReport1[]>{

    let map = new Map<number, PositionReport1[]>;

    for (let i = 0; i < msgs.length; i++) {
      let mappedMMSI = map.get(msgs[i].mmsi) as unknown;
      if (mappedMMSI === undefined) {
        // The MMSI found in the most recently received position report is not found in the map
        //  Set the key and value in the map
        let positionReport = msgs[i] as PositionReport1
        let positionReportArray: PositionReport1[] = [];
        positionReportArray.push(positionReport);
        map.set(msgs[i].mmsi, positionReportArray);
      }
      else {
        // The MMSI found in the most recently received position report is in the map
        //  Add the position report to the map

        let fred: PositionReport1[] = map.get(mappedMMSI as number) as PositionReport1[];
        let pr: PositionReport1 = msgs[i] as PositionReport1
        if(fred != undefined) {
          fred.push(pr);
        }
        map.set(mappedMMSI as number, fred);

      }
    }
    return map;
  }

  getDataArray(): PositionReport1[] {

    return this.dataArray;
  }


}
