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
  @ViewChild('container') container;
  @ViewChild('topic') topic;
  @ViewChild('map') mapElement: ElementRef;

  map: any;
  showroom = showroomDetails;
  myheight = '500px'
  constructor(private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(()=>{
      setTimeout(() => {
        let containerHeight= this.container.nativeElement.offsetHeight;
        let topicHeight = this.topic.nativeElement.offsetHeight;
        this.myheight = (containerHeight-topicHeight).toString()+'px';
        console.log(containerHeight-topicHeight);
      },2000)
    })
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
    
      console.log(this.topic.nativeElement.offsetHeight);
    })


  }
}

// https://stackoverflow.com/questions/57985967/adding-multiple-markers-in-ionic-google-map