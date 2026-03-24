import { AfterViewInit, Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { MapServiceService } from '../services/map.service';
import { Observable } from 'rxjs';
import { JsonReaderService } from '../services/json-reader.service';
import { FeatureCollection, GeoJsonGeometryTypes } from 'geojson';
import { AntPath, antPath } from 'leaflet-ant-path';
import { MyFakeDataService } from '../services/my-fake-data.service';
import { PositionReport } from '../position-report';

@Component({
  selector: 'app-geo-map',
  imports: [],
  templateUrl: './geo-map.html',
  styleUrl: './geo-map.css'
})

export class GeoMap  implements AfterViewInit, OnInit  {

  // @Input() message!: Map<number, PositionReport[]>;


  cbCenter: L.LatLngExpression = [38.5214, -77.1050];

  private displayMap! : L.Map;
  
  private cbOutline: any;

  constructor(
    private mapService: MapServiceService,
    private jsonReader: JsonReaderService,
    private myFakeDataService: MyFakeDataService
  )   { }

      geoJsonData?: FeatureCollection;

  ngOnInit(): void {


  }

  // ngOnChanges(changes: SimpleChanges) {

  //   console.log("The value of this.PositionReportMap in app.component has changed to: ");
  //   console.log(this.message);
  // }



  getArrayOfLatLongsFromService(){

    let latLongArr: () => [number, number];

    latLongArr = this.myFakeDataService.getLatLongsFromMap;

    console.log("In the map.ts file, the below is the array of lats and longs");
    console.log(latLongArr);
    return latLongArr;
  }


  

  // Method that accepts an array and then converts it to GeoJSON - Currently not working because we're passing in an Object, not an array
  convertToGeoJSON(data: any[]): any {
    const features: any[] = data.map(item => {
      // Assuming each item has 'latitude' and 'longitude' properties
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon', // Or 'Point', 'LineString', 'Polygon' depending on your data
          coordinates: [item.longitude, item.latitude]
        },
        properties: {
          // Include other relevant properties from your data
          name: item.name,
          // ...
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features: features
    };
  }


  private initMap(): void {

    console.log("this.map in the geoMap initMap function is: ")
    console.log(this.displayMap);

    this.displayMap = L.map('cbMap', {
      center: this.cbCenter,
      zoom: 7
      });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    tiles.addTo(this.displayMap);

    const options = { use: L.polyline, delay: 400, dashArray: [10,20], weight: 5, color: "#0000FF", pulseColor: "#FFFFFF" };
    const path = antPath(this.getArrayOfLatLongsFromService, options);
    path.addTo(this.displayMap);


    // Service call returns an observable to which we subscribe
    this.jsonReader.getFred().subscribe(
    (rawData: FeatureCollection) => {


          this.geoJsonData = rawData;
          L.geoJSON(this.geoJsonData).addTo(this.displayMap);


    },

    )

  }


// Called once all the components and child components have been initialized
    ngAfterViewInit(): void {
      this.initMap();

     }


}
