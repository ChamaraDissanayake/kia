import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import showroomDetails from './../../assets/showroomdetails.json';

declare var google;

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.page.html',
  styleUrls: ['./find-us.page.scss'],
})
export class FindUsPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  showroom = showroomDetails;

  constructor(private platform: Platform) { }

  ngOnInit() {
  }

  // ngAfterViewInit(): void {

  // }

  ionViewDidEnter(){
    const options = {
      zoom: 15,
      // center: new google.maps.LatLng(6.8928209, 79.8705022),
      center: new google.maps.LatLng(this.showroom.latitude, this.showroom.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.platform.ready().then(()=>{
      // setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, options);
    
      new google.maps.Marker({
        position: new google.maps.LatLng(this.showroom.latitude, this.showroom.longitude),
        map: this.map
      });
    // }, 10000);
    })


  }
}

// https://stackoverflow.com/questions/57985967/adding-multiple-markers-in-ionic-google-map