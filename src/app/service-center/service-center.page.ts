import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import showroomslist from './../../assets/showroom.json';
import showroomdetails from './../../assets/showroomdetails.json';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-service-center',
  templateUrl: './service-center.page.html',
  styleUrls: ['./service-center.page.scss'],
})
export class ServiceCenterPage implements OnInit {
  serviceCenters : any = [];
  pricing:any=[];
  //  = showroomslist; //Need service centers list
  // serviceCenterDetails;
  //  = showroomdetails; //Need service center details
  supervisors: any = [];
  //  = showroomdetails.supervisors;
  showroomId: string = '';
  showroomName: string;
  showroomAddress: string;
  showRoomOpenHours: string;
  showroomAddressSplitted;
  isValid: boolean = false;
  tempEvent: any;

  constructor(private router: Router,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    public http: HttpClient,
    ) { }

  ngOnInit() {
    this.getShopList();

    if(this.kiaProviderService.booking_type==5){
      this.getAutoSpaPricing()
    }
  }

  // selectShowroom(event){
  //   console.log(event.target.value);
  //   this.sendShowroomId(event.target.value);
  // }

  selectSupervisor(event){
    let key = event.target.value;
    this.kiaProviderService.supervisor_id = event.target.value.substring(0,key.indexOf(','));
    this.kiaProviderService.supervisor_name = event.target.value.substring(key.indexOf(',')+1, key.length);
    this.isValid = true;
    console.log("supervisor_id",this.kiaProviderService.supervisor_id, this.kiaProviderService.supervisor_name);
  }

  gotoCalendar(){
    this.kiaProviderService.showroom_id=this.showroomId;
    this.router.navigateByUrl("/calendar");
  }

  // sendShowroomId(showroomid: any) {
  //   this.showroomId = showroomid;
  //   setTimeout(() => {
  //     this.showroomId=this.serviceCenterDetails.shop_id;
  //     this.showroomName=this.serviceCenterDetails.shop_name;
  //     this.showroomAddress=this.serviceCenterDetails.shop_address;
  //     this.showRoomOpenHours=this.serviceCenterDetails.shop_openTime + " to " + this.serviceCenterDetails.shop_closeTime;
  //     if(this.serviceCenterDetails.supervisors.length>0){
  //       this.isValid = false;
  //     }else{
  //       this.isValid = true;
  //     }
  //   }, 1000);
  // }

  selectShowroom(event){
    this.tempEvent = event;
    this.kiaProviderService.showroom_id=event.target.value;
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "shop_id":this.kiaProviderService.showroom_id,
      "booking_type":this.kiaProviderService.booking_type
    },
    url: any = this.kiaProviderService.baseURL + 'getDealerShopListDetails';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log('Congratulations service centers data was', data);
      this.showroomId=data[0].shop_id;
      this.showroomName=data[0].shop_name;
      this.showroomAddress=data[0].shop_address;
      this.showroomAddressSplitted = this.showroomAddress.split(",");  
      this.showRoomOpenHours=data[0].shop_openTime.substring(0,5) + " to " + data[0].shop_closeTime.substring(0,5);
      this.isValid = true;
      this.supervisors = data[0].supervisors;
      this.tempEvent=null;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry1();
    }); 
  }

  async Retry1() {
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

  getShopList(){
    console.log('booking type', this.kiaProviderService.booking_type);

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_type":this.kiaProviderService.booking_type
    },
    url: any = this.kiaProviderService.baseURL + 'getShowRoomList';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log('Congratulations data was', data);
      this.serviceCenters = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry2();
    }); 
  }

  async Retry2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getShopList();
          }
        }
      ]
    });
    await alert.present();
  }

  getAutoSpaPricing(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
    url: any = this.kiaProviderService.baseURL + 'getAutoSpaPriceList';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log('Congratulations auto spa data was', data);
      this.pricing = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry3();
    }); 
  }

  async Retry3() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getAutoSpaPricing();
          }
        }
      ]
    });
    await alert.present();
  }
}
