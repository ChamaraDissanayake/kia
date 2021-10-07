import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { KiaProviderService } from './kia-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Storage } from '@ionic/storage-angular';

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
    public http: HttpClient,
    private device: Device,
    // private storage: Storage
    ) {
    this.platform.ready().then(()=>{
      // this.storage.create();
      // this.storedData();
      let deviceID = this.device.uuid;
      this.sendDeviceID(deviceID);    
      kiaProviderService.deviceId = deviceID;
      
    //   router.navigateByUrl("login");
      // setTimeout(() => {
      //   console.log("splash hide now")
      // }, 10000);

    })
    
  }

  // async storedData(){
  //   let getStoredData = await this.storage.get("isNewUser");
  //   console.log('is new user' + getStoredData);
  //   if(!getStoredData){
  //     this.router.navigateByUrl("home");
  //   }else{
  //     this.router.navigateByUrl("login");
  //   }
  // }
  
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

  getoServices(num: any){
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

  getoDamageEstimate(){
    setTimeout(() => {
      this.kiaProviderService.booking_type = 6;
      this.router.navigateByUrl("/damage-estimate");
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
      // this.kiaProviderService.user_id = data.user_id
      // this.kiaProviderService.permissionLevel=data.register_status;
      this.kiaProviderService.user_id = "13";
      this.kiaProviderService.permissionLevel=2;
      console.log(this.kiaProviderService.user_id, this.kiaProviderService.permissionLevel);
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    });      
  }
}
