export interface PositionReport {

    MMSI:                       number;
    BaseDateTime:               string;
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
    VesselTypeTxt:  	        string;
    CargoTxt:       	        string;
    Hazardous:                  boolean;
    NavStatus:                  string;


}
