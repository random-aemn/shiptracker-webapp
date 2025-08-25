
In order to reference variables/methods defined in external file, three (3) elements are required:

1. Place the resource file in the `public` folder (at the same level as `src`) For Angular 18 & up.
   * This example uses a GEOJSON file to describe a bounding box on a map
   * The GEOJSON file is saved in the `public` folder

1. Create an Angular Service class
   1. 
   1. kk


- Declare the variable in the external file containing TS/JS with

     ```
    export var variableName = 
     ```
- In the component file
     ```
    import { json_cboutline } from '../../assets/cboutline';
    ```
- Add relative file location to the scripts array  in the projects body within the angular.json file
    ```
    scripts": ["src/assets/cboutline.js"]
    ```
