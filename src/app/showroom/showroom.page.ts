import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import showroomslist from './../../assets/showroom.json';
// import showroomdetails from './../../assets/showroomdetails.json';
import { KiaProviderService } from '../kia-provider.service';


@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.page.html',
  styleUrls: ['./showroom.page.scss'],
})
export class ShowRoomPage implements OnInit {
  // showrooms = showroomslist;
  showrooms;
  // showroomDetails = showroomdetails;
  // showroomId: string;
  showroomName: string = '';
  showroomAddress: string = '';
  showroomAddressSplitted:any = [];
  showRoomOpenHours: string = '';
  isValid: boolean = false;
  tempEvent: any;

  constructor(private router: Router,
    // private platform: Platform,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    public http: HttpClient,
    ) { }

  ngOnInit() {
    // this.platform.ready().then(()=>{
    //   this.showroom.forEach(element => {
    //     element.shop_name
    //   })
    // })
    this.getShowroomList();
  }

  getShowroomList(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_type":this.kiaProviderService.booking_type
    },
    url: any = this.kiaProviderService.baseURL + 'getShowRoomList';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log(`Congratulations data was `, data);
      this.showrooms = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry1();
    }); 
  }

  selectShowroom(event){
    this.tempEvent = event;
    this.kiaProviderService.showroom_id=event.target.value;
    console.log("test drive ",this.kiaProviderService.showroom_id, this.kiaProviderService.booking_type)

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "shop_id":this.kiaProviderService.showroom_id,
      "booking_type":this.kiaProviderService.booking_type
    },
    url: any = this.kiaProviderService.baseURL + 'getDealerShopListDetails';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log(`Congratulations showroom data was `, data);
      this.showroomName=data[0].shop_name;
      this.showroomAddress=data[0].shop_address;
      this.showroomAddressSplitted = this.showroomAddress.split(",");  
      this.showRoomOpenHours=data[0].shop_openTime.substring(0,5) + " to " + data[0].shop_closeTime.substring(0,5);
      this.isValid = true;
      this.tempEvent=null;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry2();
    }); 
  }

  gotoCalendar(){
    this.router.navigateByUrl("/calendar");
  }

  async Retry1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getShowroomList();
          }
        }
      ]
    });
    await alert.present();
  }

  async Retry2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.selectShowroom(this.tempEvent);
          }
        }
      ]
    });
    await alert.present();
  }
}
