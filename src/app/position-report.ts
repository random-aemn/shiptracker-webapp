export interface PositionReport {

    mmsi:                       number;
    BaseDateTime:               Date;
    LAT:                        number;
    LON:                        number;
    SOG:                        number;
    COG:                        number;
    Heading:	                number;
    VesselName:	                string;
    IMO:                        string;
    CallSign:	                string;
    VesselType:	                number;
    Status:                     number;
    Length:	                    number;
    Width:                      number;
    Draft:	                    number;
    Cargo:	                    number;
    TransceiverClass:	        string;
    Vessel_CargoType:	        string;
    Vessel_CargoClass:	        string;
    Hazardous:                  boolean;
    NavStatus:                  string;


}
