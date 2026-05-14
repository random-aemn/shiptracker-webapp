import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {PositionReport} from '../position-report';
import {Browser, LatLng} from 'leaflet';
import pointer = Browser.pointer;

    interface mmsiPrType {
      mmsi: number;
      positionReportArr: PositionReport[];
    }



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

  filterMapByDate(prMap: Map<number, PositionReport[]>, inHorizonDate: Date) : Map<number, PositionReport[]> {
  // Records with a BaseDateTime equal to or before to horizonDate will be deleted
    prMap.forEach((prArrayData, key) => {
      let deletionCount = 0;
      for (let i = 0; i < prArrayData.length; i++) {
        let thisDate = new Date(prArrayData[i].BaseDateTime);
        if (thisDate <= inHorizonDate) {
          deletionCount++;
        }
        else
          break;
      }
      if (deletionCount > 0) {
        console.log("slicing from 0 to " + (deletionCount));
        let filteredArr = prArrayData.slice(deletionCount)
        // If the array no longer contains data, delete the mmsi from the prMap
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


    // setLatLongsFromMap(aPositionReportMap: Map<number, PositionReport[]>){




  public createCargoMapFromPrMap(aPrMap: Map<number, PositionReport[]>){

    // for (const [mmsi, currentPositionReportList] of aPrMap){
    //   let currentCargo = currentPositionReportList[0].Vessel_CargoType;
    //   let mmsiPr: mmsiPrType = {mmsi, currentPositionReportList};
    
    //   let cargoMmsiMap = new Map<string, mmsiPrType[]>

    //     if (cargoMmsiMap.has(currentCargo)){
    //         cargoMmsiMap.get(currentCargo)!.push(mmsiPr);

    //     }
    // }


        for (let reportKey of aPrMap.keys()){
      let currentCargo = aPrMap.get(reportKey)![0].Vessel_CargoType;
      let currentPositionReportList = aPrMap.get(reportKey);

      let mmsiPr: mmsiPrType = {reportKey, currentPositionReportList};
    
      let cargoMmsiMap = new Map<string, mmsiPrType[]>

        if (cargoMmsiMap.has(currentCargo)){
            cargoMmsiMap.get(currentCargo)!.push(mmsiPr);

        }
    }

  }



}

