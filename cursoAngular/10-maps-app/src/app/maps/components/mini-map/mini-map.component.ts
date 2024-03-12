import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number];
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw new Error('Map div no se encuentra');
    if (!this.lngLat) throw new Error('LngLat no puede ser nulo');

    // Construimos el mapa
    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 11, // starting zoom
      interactive: false
    });
    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }
}
