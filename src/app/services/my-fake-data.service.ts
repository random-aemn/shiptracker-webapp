import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PositionReport } from '../models/position-report';
import { MmsiPrType } from '../models/mmsi-positionReport-type';
import L, {Browser, geoJSON, GeoJSON, LatLng} from 'leaflet';
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
        // console.log("The filter date is: " + inHorizonDate.toISOString() + " the item's date at the array index " + i + " is: " + thisDate.toISOString())

        if (thisDate <= inHorizonDate) {
          deletionCount++;
        }
        else
          break;
      }
      if (deletionCount > 0) {
        // console.log("DeletionCount is: " + deletionCount);
        // console.log("The content of prArrayData is: ")
        // console.info(prArrayData);
        let filteredArr = prArrayData.slice(deletionCount);

        // console.log("After slicing, the value of the filteredArr is:");
        // console.info(filteredArr);
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



  public createCargoMapFromPrMap(aMapOfCargoAndPositionReports: Map<string, MmsiPrType[]>, aPrMap: Map<number, PositionReport[]>): Map<string, MmsiPrType[]> {

    let cargo2MmsiMap = new Map<string, MmsiPrType[]>()

    for(const [mmsi, currentPositionReportList] of aPrMap){
      // const mmsiStr = String(mmsi);
      let currentCargo = currentPositionReportList[0]?.CargoTxt ?? "Unknown";
      // const fred: PositionReport= currentPositionReportList[0];


      const mmsiPr: MmsiPrType = {mmsi, positionReportArr: currentPositionReportList};

      const existingList = cargo2MmsiMap.get(currentCargo);

      if(existingList){

        existingList.push(mmsiPr);
      }
      else {
        cargo2MmsiMap.set(currentCargo, [mmsiPr]);
      }

    }
    return cargo2MmsiMap;

  }

  /*
  Create a L.geoJson layer for each cargo type (LNG, Passenger, etc.).
   */
  public createEmptyLayer(aCargoLayerMap: Map<string, L.GeoJSON>, aCargo2MmsiMap: Map<string, MmsiPrType[]>): Map<string, L.GeoJSON>{

    for(let cargoKey of aCargo2MmsiMap.keys()){
      if(!aCargoLayerMap.has(cargoKey)){
        aCargoLayerMap.set(cargoKey, L.geoJSON(null))
      }
    }
    return aCargoLayerMap;
  }

  // maintainCargoTypeLayerMap(aCargoTypeLayerMap: Map<string, L.GeoJSON>, aMessageList: PositionReport[]){
  //
  //   // const uniqueCargoTypes = aMessageList.filter
  //   for(let message of aMessageList){
  //     if(!aCargoTypeLayerMap.has(message.CargoTxt)){
  //       aCargoTypeLayerMap.set(message.CargoTxt, L.geoJSON(null));
  //     }
  //   }
  //
  // }




}

