import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { KiaProviderService } from './kia-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  pickAndDropSub: boolean = false;

  constructor(
    private router: Router,
    private platform: Platform,
    public kiaProviderService: KiaProviderService,
    public http: HttpClient,
    private device: Device,
    private alertController: AlertController
    ) {
    this.platform.ready().then(()=>{
      let deviceID = this.device.uuid;
      this.sendDeviceID(deviceID);    
      kiaProviderService.deviceId = deviceID;
    })
  }

  menuClosed(){
    this.pickAndDropSub = false;
  }
  
  gotoLogin(){
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 500);
  }

  gotoMyProfile(){
    setTimeout(() => {
      this.router.navigateByUrl("my-profile");
    }, 500);
  }

  goToShowroom(){
    setTimeout(() => {
      this.kiaProviderService.booking_type = 1;
      this.router.navigateByUrl("showroom");
    }, 500);
  }

  gotoServices(num: any){
    this.kiaProviderService.booking_type = num;
    setTimeout(() => {
      this.router.navigateByUrl("/service-center");
    }, 500);
  }

  // gotoSelectedVehicle(){
  //   setTimeout(() => {
  //     this.router.navigateByUrl("/selected-veicle");
  //   }, 500);
  // }

  gotoRequestPart(){
    setTimeout(() => {
      this.router.navigateByUrl("/my-part-requests");
    }, 500);
  }

  gotoAccessories(){
    setTimeout(() => {
      this.router.navigateByUrl("/accessories");
    }, 500);
  }

  gotoHome(){
    setTimeout(() => {
      this.router.navigateByUrl("/home");
    }, 500);
  }

  gotoShowroomList(){
    setTimeout(() => {
      this.router.navigateByUrl("/showroom-list");
    }, 500);
  }

  goToMyBookings(){
    setTimeout(() => {
      this.router.navigateByUrl("/my-bookings");
    }, 500);
  }

  gotoCallUs(){
    setTimeout(() => {
      this.router.navigateByUrl("/call-us");
    }, 500);
  }

  gotoDamageEstimate(){
    setTimeout(() => {
      this.kiaProviderService.booking_type = 6;
      this.router.navigateByUrl("/damage-estimate");
    }, 500);
  }

  gotoOnlinePayment(){
    setTimeout(() => {
      this.router.navigateByUrl("/online-payment");
    }, 500);
  }

  openSubPick(){
    this.pickAndDropSub = !this.pickAndDropSub;
  }

  gotoPickAndDropBookings(){
    setTimeout(() => {
      this.router.navigateByUrl("/pick-and-drop-bookings");
    }, 500);
  }

  gotoPickAndDrop(){
    setTimeout(() => {
      this.router.navigateByUrl("/pick-and-drop");
    }, 500);
  }

  sendDeviceID(deviceID:string) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "device_id":deviceID
    },
      
    url: any = this.kiaProviderService.baseURL + 'appLoading';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      this.kiaProviderService.user_id = data.user_id;
      this.kiaProviderService.permissionLevel=data.register_status;
      // this.kiaProviderService.user_id = "13";
      // this.kiaProviderService.permissionLevel=2;
      console.log(this.kiaProviderService.user_id, this.kiaProviderService.permissionLevel);
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
            this.sendDeviceID(this.kiaProviderService.deviceId);
          }
        }
      ]
    });
    await alert.present();
  }
}
