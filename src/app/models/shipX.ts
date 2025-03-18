export class ShipX {

constructor(fred: any) {

  // this._mmsi = fred.

}

   _mmsi: string | undefined;
   _baseDateTime: string | undefined;
   _lat: string | undefined;
   _long: string | undefined;
   _heading: string | undefined;
   _vesselName: string | undefined;


  get mmsi(): string | undefined {
    return this._mmsi;
  }

  set mmsi(value: string) {
    this._mmsi = value;
  }

  get baseDateTime(): string |undefined {
    return this._baseDateTime;
  }

  set baseDateTime(value: string) {
    this._baseDateTime = value;
  }

  get lat(): string | undefined
  {
    return this._lat;
  }

  set lat(value: string) {
    this._lat = value;
  }

  get long(): string | undefined {
    return this._long;
  }

  set long(value: string) {
    this._long = value;
  }

  get heading(): string | undefined {
    return this._heading;
  }

  set heading(value: string) {
    this._heading = value;
  }

  get vesselName(): string | undefined {
    return this._vesselName;
  }

  set vesselName(value: string) {
    this._vesselName = value;
  }
}
