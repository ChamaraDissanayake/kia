import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

declare var google;

@Component({
  selector: 'app-pick-and-drop-location',
  templateUrl: './pick-and-drop-location.page.html',
  styleUrls: ['./pick-and-drop-location.page.scss'],
})
export class PickAndDropLocationPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude:number = 0;
  longitude:number = 0;

  constructor(
    private platform: Platform,
    // private geolocation: Geolocation,
    // private alertController: AlertController,
    // private router: Router,
    private kiaProviderService: KiaProviderService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      this.setMapMarker(this.kiaProviderService.pickLatitude, this.kiaProviderService.pickLongitude);
      this.latitude = this.kiaProviderService.pickLatitude;
      this.longitude = this.kiaProviderService.pickLongitude;
    })
    this.kiaProviderService.pickMap = true;
  }

  setMapMarker(lat, long) {
    let that = this;
    const options = {
      zoom: 15,
      center: new google.maps.LatLng(lat, long),
      // center: new google.maps.LatLng(this.showroom.latitude, this.showroom.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      map: this.map,
      draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function() {
      console.log("position", marker.getPosition().lat(),marker.getPosition().lng())
      that.latitude = marker.getPosition().lat();
      that.longitude = marker.getPosition().lng();
    });
  }

  saveLocation(){
    this.kiaProviderService.pickLatitude = this.latitude;
    this.kiaProviderService.pickLongitude = this.longitude;
    this.navController.back();
  }

}
