import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import type {FeatureCollection} from 'geojson'
import { MapServiceService } from '../services/map.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
  providers: [MapServiceService]
})

export class Map  implements AfterViewInit{



  private map: L.Map | undefined;
  private cbOutline: any;

  constructor(
    private mapService: MapServiceService,

  ) { }


  private initMap(): void {

    const cbBox = [
	    [38.886757, -76.415405],
	    [38.659778, -76.195679],
	    [38.483695, -76.393433],
	    [38.104305, -76.228638],
	    [37.474858, -76.766968]
      ];

    const latLngs = cbBox.map(coords => L.latLng(coords[0], coords[1]));



    const cbCenter: L.LatLngExpression = [38.5214, -77.1050]

    this.map = L.map('map', {
      center: cbCenter,
      zoom: 7
      });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

    tiles.addTo(this.map);

    let cbAntBox = new L.Polyline(latLngs, {color: 'blue', weight: 2}).addTo(this.map); 


    console.log("Here's Johnny on the spot!");
    // console.log(json_cboutline);




    L.geoJSON(this.cbOutline, {
    style: function (feature) {
        return {color: 'red', weight: 1,
            fill: false
        };
      }
    }).addTo(this.map);


  }



    ngAfterViewInit(): void {

          this.initMap();


    this.mapService.getChesapeakeBayOutline().subscribe(bayBounder => {
      this.cbOutline = bayBounder;
    })

          console.log("Did I get the data: ")
          console.log(this.cbOutline);


     }


}
