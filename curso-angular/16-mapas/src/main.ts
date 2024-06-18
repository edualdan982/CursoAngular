import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YWxkYW45ODIiLCJhIjoiY2x0aGEwMjd4MDJvcTJpcnJia2l0M2FiYiJ9.XYH2KZ2zuRcYwh8t3Inssw';

if (!navigator.geolocation) {
  alert('Navegador no soporta Geolocalización.');
  throw new Error('Navegador no soporta Geolocalización.');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
