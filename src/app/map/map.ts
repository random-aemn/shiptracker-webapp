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

    this.map = L.map('cbMap', {
      center: this.cbCenter,
      zoom: 7
      });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    tiles.addTo(this.map);


    // Service call returns an observable to which we subscribe
    this.jsonReader.getFred().subscribe(
    (rawData: FeatureCollection) => {


          this.geoJsonData = rawData;
          L.geoJSON(this.geoJsonData).addTo(this.map);


    },

    )

  }


// Called once all the components and child components have been initialized
    ngAfterViewInit(): void {
      this.initMap();

     }


}
