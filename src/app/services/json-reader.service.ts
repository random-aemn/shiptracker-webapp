import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonReaderService {


  
constructor (private http: HttpClient) {};



/* by default, the http.get method uses the information defined in the angular.json file to determine the directory
being searched for the file location passed into the method.

In angular.json define the path(s) to static assets for the application.  The defualt path
points to the project's public directory
Reference: angular.dev/reference/configs/workspace-config
*/

// public getChesapeakeBayOutline() {
//   return this.http.get('./cboutline.json').subscribe(data => {

//     this.boundingbox = data;
//     console.log("this should have json data");

//     //console.info will output multiple objects
//     console.info(data);


//     console.log("Here is the data we want:");
    
//     // console.log(data.features[0].geometry.coordinates[0]);

//    let crap = JSON.stringify(data);
//    console.log("The string representation of crap" );
//    console.log(crap);
    
//   })
// }



public getFred(): Observable<any> {

    return this.http.get('./cboutline.json');

  }


  
}
