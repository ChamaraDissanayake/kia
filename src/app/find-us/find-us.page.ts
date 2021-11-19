import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
// import showroomDetails from './../../assets/showroomdetails.json';

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
  // showroom = showroomDetails;
  showroom:any=[];
  myheight = '600px'
  constructor(
    private platform: Platform,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        let containerHeight = this.container.nativeElement.offsetHeight;
        let topicHeight = this.topic.nativeElement.offsetHeight;
        this.myheight = (containerHeight - topicHeight).toString() + 'px';
        console.log(containerHeight - topicHeight);
      }, 2000)
    });
    this.selectedShowroom()
  }

  // ionViewDidEnter(){
  //   console.log("Entered");
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.currentLocation.lat = resp.coords.latitude;
  //     this.currentLocation.lang = resp.coords.longitude;
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //     console.log("geolocation",resp);
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }

  setMapMarker() {
    const options = {
      zoom: 15,
      // center: new google.maps.LatLng(6.8928209, 79.8705022),
      center: new google.maps.LatLng(this.showroom.latitude, this.showroom.longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.platform.ready().then(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, options);

      new google.maps.Marker({
        position: new google.maps.LatLng(this.showroom.latitude, this.showroom.longitude),
        map: this.map
      });

      console.log(this.topic.nativeElement.offsetHeight);
    })
  }

  selectedShowroom() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "shop_id": this.kiaProviderService.showroom_id,
        "booking_type": 0
      },
      // url: any = this.kiaProviderService.baseURL + 'getDealerShopListDetails';
      url: any = this.kiaProviderService.baseURL + 'getDealerShopListData';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // console.log(`Congratulations find us data was `, data[0]);
        this.showroom = data;
        this.setMapMarker();
      },
        (error: any) => {
          console.log('Something went wrong!', error);
          this.Retry();
        });
  }

  async Retry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
        text: 'Try again',
        handler: () => {
          this.selectedShowroom();
        }
      }
      ]
    });
    await alert.present();
  }

  navigate() {
    window.open("https://www.google.com/maps/place/"+this.showroom.latitude+","+this.showroom.longitude);
    // console.log("working")
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.currentLocation.lat = resp.coords.latitude;
    //   this.currentLocation.lang = resp.coords.longitude;
      // resp.coords.latitude
      // resp.coords.longitude
      // console.log("geolocation", resp);
      // window.open("https://www.google.com/maps/place/"+this.showroom.latitude+","+this.showroom.longitude);
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }
}

// https://stackoverflow.com/questions/57985967/adding-multiple-markers-in-ionic-google-map