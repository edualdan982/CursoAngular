export interface DirectionsResponse {
  routes:    Route[];
  waypoints: Waypoint[];
  code:      string;
  uuid:      string;
}

export interface Route {
  geometry:    Geometry;
  legs:        Leg[];
  weight_name: string;
  weight:      number;
  duration:    number;
  distance:    number;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type:        Type;
}

export enum Type {
  LineString = "LineString",
}

export interface Leg {
  steps:    Step[];
  summary:  string;
  weight:   number;
  duration: number;
  distance: number;
}

export interface Step {
  geometry:      Geometry;
  maneuver:      Maneuver;
  mode:          string;
  driving_side:  string;
  name:          string;
  intersections: Intersection[];
  weight:        number;
  duration:      number;
  distance:      number;
  ref?:          string;
}

export interface Intersection {
  out?:     number;
  entry:    boolean[];
  bearings: number[];
  location: number[];
  in?:      number;
}

export interface Maneuver {
  bearing_after:  number;
  bearing_before: number;
  location:       number[];
  type:           string;
  instruction:    string;
  modifier?:      string;
}

export interface Waypoint {
  distance: number;
  name:     string;
  location: number[];
}
