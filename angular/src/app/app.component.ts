import { Component } from '@angular/core';
import { App }    from './app';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  http: Http;
  sanitizer: DomSanitizer;
  url_googlemap: SafeResourceUrl;
  url_openstreetmap: SafeResourceUrl;
  model = new App('bulevard Vitosha 4, Sofia, Bulgaria'); // Default address

  constructor(http: Http, sanitizer: DomSanitizer) {
    this.http = http;
    this.sanitizer = sanitizer;
    this.displayGpsc(this.model.address, 'googlemaps');
    this.displayGpsc(this.model.address, 'openstreetmap')
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.displayGpsc(this.model.address, 'googlemaps');
    this.displayGpsc(this.model.address, 'openstreetmap')
  }
  displayGpsc(address: String, endpoint: String) {
    this.http.get('https://taskapi.peoplegogo.com/geocode/'+endpoint+'?address='+address)
      .map(response => response.json())
      .subscribe(coordinates =>
        {
          if (coordinates.length > 0) {
            if (endpoint == 'googlemaps') {
              this.url_googlemap = this.sanitizer.bypassSecurityTrustResourceUrl('http://maps.google.com/maps?q='+coordinates[0]['lat']+','+coordinates[0]['lon']+'&z=15&output=embed');
            } else if (endpoint == 'openstreetmap') {
              this.url_openstreetmap = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.openstreetmap.org/export/embed.html?bbox='+(coordinates[0]['lon'] - 0.00668)+','+(coordinates[0]['lat'] - 0.0035)+','+(coordinates[0]['lon'] + 0.0035)+','+(coordinates[0]['lat'] + 0.00668)+'&layer=mapnik&marker='+coordinates[0]['lat']+','+coordinates[0]['lon']);
            }
          }
        }
      );
  }
}
