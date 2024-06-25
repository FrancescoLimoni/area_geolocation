import { LatLngTuple } from "leaflet";

export interface Location {
  title: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    province: string;
    region: string;
  };
  latLng: LatLngTuple;
  subs: Sublocation[];
}

interface Sublocation {
  label: string;
  sublabel: string;
  number: number;
}
