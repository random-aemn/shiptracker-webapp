import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PositionReport } from '../models/position-report';
import { MmsiPrType } from '../models/mmsi-positionReport-type';
import { Browser, LatLng } from 'leaflet';
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


      let coordinates: [number, number];

      for(let pr of value){
        coordinates = [pr.LAT, pr.LON];
        // this.latLong.push(coordinates);
        this.latLong.push(pr.LAT, pr.LON);

      }

    }


  }

  getLatLongsFromMap(): [number, number] {
    return this.latLong;

  }

  loadPositionReportsFromArray(aPrMap: Map<number, PositionReport[]>, prArr: PositionReport[]): Map<number, PositionReport[]>{

  // let prMap = new Map<number, PositionReport[]>();

    // Now, load the array of position reports into the data map
    for (let i = 0; i < prArr.length; i++) {
      const existingArray = aPrMap.get(prArr[i].MMSI) ?? []; // ?? is the nullish coalescing operator - the fallback value is an empty array
      // 2. Add the new element to the array
      existingArray.push(prArr[i]);

      // 3. Update the map with the modified array (even if the key was new)
      aPrMap.set(prArr[i].MMSI, existingArray);
    }

    return aPrMap;

  }

  filterMapByDate(prMap: Map<number, PositionReport[]>, inHorizonDate: Date) : Map<number, PositionReport[]> {

    prMap.forEach((prArrayData, key) => {
      let deletionCount = 0;
      for (let i = 0; i < prArrayData.length; i++) {
        let thisDate = new Date(prArrayData[i].BaseDateTime);
        console.log("The filter date is: " + inHorizonDate.toISOString() + " the item's date at the array index " + i + " is: " + thisDate.toISOString())

        if (thisDate <= inHorizonDate) {
          deletionCount++;
        }
        else
          break;
      }
      if (deletionCount > 0) {
        console.log("DeletionCount is: " + deletionCount);
        console.log("The content of prArrayData is: ")
        console.info(prArrayData);
        let filteredArr = prArrayData.slice(deletionCount);

        console.log("After slicing, the value of the filteredArr is:");
        console.info(filteredArr);
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



  public createCargoMapFromPrMap(aPrMap: Map<number, PositionReport[]>){


    // for (const [mmsi, currentPositionReportList] of aPrMap){
    //   let currentCargo = currentPositionReportList[0].CargoTxt;
    //   console.log("The current cargo type of aPrMap is: " )
    //
    // }

    for (let key of aPrMap.keys()){
      let currentCargo = aPrMap.get(key)![0].CargoTxt;
    }





    // for (const [mmsi, currentPositionReportList] of aPrMap){
    //   let currentCargo = currentPositionReportList[0].Vessel_CargoType;
    //   let mmsiPr: mmsiPrType = {mmsi, currentPositionReportList};

    //   let cargoMmsiMap = new Map<string, mmsiPrType[]>

    //     if (cargoMmsiMap.has(currentCargo)){
    //         cargoMmsiMap.get(currentCargo)!.push(mmsiPr);

    //     }
    // }


    //     for (let reportKey of aPrMap.keys()){
    //   let currentCargo = aPrMap.get(reportKey)![0].CargoTxt;
    //   let currentPositionReportList = aPrMap.get(reportKey);

    //   let mmsiPr: MmsiPrType = {reportKey, currentPositionReportList};

    //   let cargoMmsiMap = new Map<string, MmsiPrType[]>

    //     if (cargoMmsiMap.has(currentCargo)){
    //         cargoMmsiMap.get(currentCargo)!.push(mmsiPr);

    //     }
    // }

  }



}

