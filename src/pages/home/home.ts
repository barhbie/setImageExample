import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 LatLng,
 GroundOverlay
} from '@ionic-native/google-maps';
import { Component } from "@angular/core/";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  mapElement: HTMLElement;
  overlay: GroundOverlay;

  imgIndex: number = 0;
  imgs: string[] = [
    "assets/imgs/img1.png",
    "assets/imgs/img2.png",
    "assets/imgs/img3.png"
  ]

  constructor(private googleMaps: GoogleMaps) { }

  ionViewDidLoad() {
   this.loadMap();
  }

  loadMap() {
    this.mapElement = document.getElementById('map');

    const bounds = [
      (new LatLng(52.360488, 0.465456)),
      (new LatLng(72.772913, 35.517719))
    ];

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: new LatLng(64.199669429495515,18.517776757478714),
        zoom: 4
      },
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Add ground overlay
        this.map.addGroundOverlay({
          'url': this.imgs[0], //"http://se.baltrad.eu/data/swegmaps_2000/2017/05/05/201705050915.png",
          'bounds': bounds,
          'opacity': 0.5,
          'clickable': true  // default = false
        }).then( (groundOverlay) => {
          this.overlay = groundOverlay;
        }, (err) => { alert(err) });

      });
  }

  onClick() {
    this.imgIndex++;
    if(this.imgIndex >= 3) { this.imgIndex = 0; }

    this.overlay.setImage(this.imgs[this.imgIndex]);
  }
}