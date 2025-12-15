import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PositionReport1 } from './position-report-1';

@Injectable({
  providedIn: 'root'
})
export class MyFakeDataService {

msgs=[{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}];



  constructor() { }

  getData(): Observable<PositionReport1[]> {
    return of(
      [{"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:17", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
       {"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:18", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
       {"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:19", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"},
       {"mmsi": 367488370, "BaseDateTime": "2023-01-01T00:05:20", "LAT": 36.91130, "LON": -75.32894, "Heading": 219.0, "VesselName": "RACHEL"}
      ]);
  };


}
