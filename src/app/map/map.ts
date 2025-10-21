import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapServiceService } from '../services/map.service';
import { Observable } from 'rxjs';
import { JsonReaderService } from '../services/json-reader.service';
import { FeatureCollection, GeoJsonGeometryTypes } from 'geojson';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css'
})

export class Map  implements AfterViewInit, OnInit  {



   cbCenter: L.LatLngExpression = [38.5214, -77.1050]

  private map! : L.Map;
  
  private cbOutline: any;

  constructor(
    private mapService: MapServiceService,
    private jsonReader: JsonReaderService,
  )   { }

      geoJsonData?: FeatureCollection;

  ngOnInit(): void {

    
    // this.jsonReader.getFred().subscribe(
    //   (data: any) => {
    //     this.geoJsonData = data;
    //     console.log("in ngOnInit, this is the geojson data");
    //     console.info(this.geoJsonData);
    //   }
    // )

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

    // const cbCenter: L.LatLngExpression = [38.5214, -77.1050]

    this.map = L.map('cbMap', {
      center: this.cbCenter,
      zoom: 7
      });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    tiles.addTo(this.map);


    // This method has the stringify and console.log statements - service call returns a subscription
    // let cbFeatureCollection = this.jsonReader.getChesapeakeBayOutline();


    // let cbBoundingBox = this.jsonReader.getFred;



    // Service call returns an observable to which we subscribe
    this.jsonReader.getFred().subscribe(
    (rawData: FeatureCollection) => {


      console.log("accessing rawData....: ");
      // This is working and the feature collection is working AS FAR AS IT IS DEFINED - believe the FeatureCollection we imported does not define FeatureCollection past geometry
      console.info(rawData.features[0].geometry);


          // console.log("in the map.ts initMap method, I'm extracting the data from the geoJson");
          // console.log(this.geoJsonData.features[0].geometry.coordinates[0]);

          this.geoJsonData = rawData;
          console.log("this is geoJsonData from the subscription/observable");
          console.info(this.geoJsonData);
          L.geoJSON(this.geoJsonData).addTo(this.map);


    },

    )



    // let cbAntBox = new L.Polyline(latLngs, {color: 'blue', weight: 2}).addTo(this.map); 
    // L.geoJSON(this.geoJsonData).addTo(this.map);
    // L.geoJSON(this.ServiceCallGeoJsonData).addTo(this.map);

    // L.geoJSON(this.cbOutline, {
    // style: function (feature) {
    //     return {color: 'red', weight: 1,
    //         fill: false
    //     };
    //   }
    // }).addTo(this.map);


  }


// Called once all the components and child components have been initialized
    ngAfterViewInit(): void {

      console.log("I'm in the ngAfterViewInit method calling the this.initMap function");
      this.initMap();

      // L.geoJSON(this.geoJsonData).addTo(this.map);


    // let cbAntBox = new L.Polyline(latLngs, {color: 'blue', weight: 2}).addTo(this.map); 
    // L.geoJSON(this.geoJsonData).addTo(this.map);
    // L.geoJSON(this.ServiceCallGeoJsonData).addTo(this.map);

    // L.geoJSON(this.cbOutline, {
    // style: function (feature) {
    //     return {color: 'red', weight: 1,
    //         fill: false
    //     };
    //   }
    // }).addTo(this.map);


     }


}
