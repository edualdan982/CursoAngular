import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DirectionsApiClient extends HttpClient {
  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/cycling/';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(
    url: string,
    options?: {
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
    }
  ) {
    url = this.baseUrl + url;
    return super.get<T>(url, {
      params: {
        alternatives:true,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: true,
        access_token: environment.apiKey
      },
    });
  }
}
