import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { KiaProviderService } from './kia-provider.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  public appPages = [
    // { title: 'SignIn/Register', url: 'login', icon: 'mail' },
    // { title: 'Showcase', url: '/folder/Models', icon: 'paper-plane' },
    // { title: 'TestDrive', url: '/phone-verify', icon: 'heart' },
    // { title: 'Showroom', url: '/showroom', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  constructor(
    private router: Router,
    private platform: Platform,
    public kiaProviderService: KiaProviderService,
    private device: Device
    ) {
    this.platform.ready().then(()=>{
    //   router.navigateByUrl("login");
      // setTimeout(() => {
      //   console.log("splash hide now")
      // }, 10000);
      console.log('Device UUID is: ' + this.device.uuid);
      kiaProviderService.deviceId = this.device.uuid;
    })
    
  }
  
  gotoLogin(){
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 500);
  }

  gotoMyProfile(){
    setTimeout(() => {
      this.router.navigateByUrl("my-profile");
      console.log("go to my profile")
    }, 500);
  }

  goToShowroom(){
    setTimeout(() => {
      this.kiaProviderService.booking_type = 1;
      this.router.navigateByUrl("showroom");
    }, 500);
  }

  getoServices(num: any){
    this.kiaProviderService.booking_type = num;
    // switch (num) {
    //   case 1:
    //     this.kiaProviderService.booking_type = 1;
    //     break;
    //   case 2:
    //     this.kiaProviderService.booking_type = 2;
    //     break;
    //   case 3:
    //     this.kiaProviderService.booking_type = 3;
    //     break;
    //   case 4:
    //     this.kiaProviderService.booking_type = 4;
    //     break;

    //   default:
    //     this.kiaProviderService.booking_type = 5;
    //     break;
    // }
    setTimeout(() => {
      this.router.navigateByUrl("/service-center");
    }, 500);
  }

  gotoSelectedVehicle(){
    setTimeout(() => {
      this.router.navigateByUrl("/selected-veicle");
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

  getoDamageEstimate(){
    setTimeout(() => {
      this.kiaProviderService.booking_type = 6;
      this.router.navigateByUrl("/damage-estimate");
    }, 500);
  }
}
