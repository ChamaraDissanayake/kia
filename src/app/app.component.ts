import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { KiaProviderService } from './kia-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

// TEST USER DETAILS:
// id: 557
// phone: 079 823 4935
// otp: 1234


export class AppComponent implements OnInit {
  pickAndDropSub: boolean = false;
  accidentSub: boolean = false;
  pendingVehiclesCount: number = 0;
  androidTest: boolean = false;

  constructor(
    private router: Router,
    private platform: Platform,
    public kiaProviderService: KiaProviderService,
    public http: HttpClient,
    private device: Device,
    private alertController: AlertController,
    private screenOrientation: ScreenOrientation,
    private storage: Storage
  ) {

    this.storage.create();
    // this.platform.ready().then(()=>{
    //   let deviceID = this.device.uuid;
    //   kiaProviderService.deviceId = deviceID;
    //   this.checkIsReview(deviceID);
    // })    
  }


  // checkIsReview(deviceID) {
  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   options: any = { },

  //   url: any = this.kiaProviderService.baseURL + 'android/review';

  //   this.http.post(url, JSON.stringify(options), headers)
  //   .subscribe((data: any) => {
  //     // console.log("chamara", data)
  //     if(!data.isAndroidReview){
  //       this.sendDeviceID(deviceID);
  //     } else {
  //       this.androidTest = true;
  //       this.sendDeviceIDTest(deviceID);
  //     }
  //   },
  //   (error: any) => {
  //     console.log('Something went wrong!', error);
  //     this.Retry0();
  //   });  
  // }

  // async Retry0() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert!',
  //     message: 'Check your connection and try again!',
  //     buttons: [{
  //         text: 'Try again',
  //         handler: () => {
  //           this.checkIsReview(this.kiaProviderService.deviceId);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  async ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.kiaProviderService.user_phone = await this.storage.get('user_phone');
    this.loadApp(this.kiaProviderService.user_phone);
    this.checkPayment()
    setInterval(() => {
      if (this.kiaProviderService.appFullyLoaded) {
        this.pendingValidations();
        if (this.kiaProviderService.permissionLevel == 1) {
          // if(this.androidTest){
          //   console.log("try to confirm test user");
          //   this.sendDeviceIDTest(this.kiaProviderService.deviceId);
          // }else{
          //   console.log("try to confirm user");
          //   this.sendDeviceID(this.kiaProviderService.deviceId);
          // }
          this.loadApp(this.kiaProviderService.user_phone);
        }
      }
    }, 30000)

  }

  async pendingValidations() {
    console.log("Searching for pending vehicles");
    let newVehicleArray: any = [];
    let check = await this.storage.get("newVehicle");
    if (check) {
      newVehicleArray = await this.storage.get("newVehicle");
      this.pendingVehiclesCount = newVehicleArray.length;
      // newVehicleArray.forEach(element => {
      this.checkVehicleRegistration(newVehicleArray);
      // });
      console.log("newVehicleArrayLength", newVehicleArray.length)
      // this.storage.set("newVehicle", newVehicleArray);
    }
  }

  menuClosed() {
    this.pickAndDropSub = false;
    this.accidentSub = false;
  }

  gotoLogin() {
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 500);
  }

  gotoMyProfile() {
    setTimeout(() => {
      this.router.navigateByUrl("my-profile");
    }, 500);
  }

  goToShowroom() {
    setTimeout(() => {
      this.kiaProviderService.booking_type = 1;
      this.router.navigateByUrl("showroom");
    }, 500);
  }

  gotoServices(num: any) {
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

  gotoRequestPart() {
    setTimeout(() => {
      this.router.navigateByUrl("/my-part-requests");
    }, 500);
  }

  gotoAccessories() {
    setTimeout(() => {
      this.router.navigateByUrl("/accessories");
    }, 500);
  }

  gotoHome() {
    setTimeout(() => {
      this.router.navigateByUrl("/home");
    }, 500);
  }

  gotoShowroomList() {
    setTimeout(() => {
      this.router.navigateByUrl("/showroom-list");
    }, 500);
  }

  goToMyBookings() {
    setTimeout(() => {
      this.router.navigateByUrl("/my-bookings");
    }, 500);
  }

  gotoCallUs() {
    setTimeout(() => {
      this.router.navigateByUrl("/call-us");
    }, 500);
  }

  gotoDamageEstimate() {
    setTimeout(() => {
      this.kiaProviderService.booking_type = 6;
      this.router.navigateByUrl("/damage-estimate");
    }, 500);
  }

  gotoOnlinePayment() {
    setTimeout(() => {
      this.router.navigateByUrl("/online-payment");
    }, 500);
  }

  openSubPick() {
    this.pickAndDropSub = !this.pickAndDropSub;
  }

  openAccidentSub() {
    this.accidentSub = !this.accidentSub;
  }

  gotoPickAndDropBookings() {
    setTimeout(() => {
      this.router.navigateByUrl("/pick-and-drop-bookings");
    }, 500);
  }

  gotoPickAndDrop() {
    setTimeout(() => {
      this.router.navigateByUrl("/pick-and-drop");
    }, 500);
  }

  gotoHelpSupport() {
    setTimeout(() => {
      this.router.navigateByUrl("/help-support");
    }, 500);
  }

  gotoContactUs() {
    setTimeout(() => {
      this.router.navigateByUrl("/contact-us");
    }, 500);
  }

  loadApp(phone: string) {
    console.log("Load app phone", phone)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "phone_number": phone,
        "androidReview": false
      },

      // url: any = this.kiaProviderService.baseURL + 'appLoading';
      url: any = this.kiaProviderService.baseURL + 'v2/appLoading';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        if (this.kiaProviderService.permissionLevel == 1 && data.register_status == 2) {
          this.Congratulations('Your registration details are confirmed. Now you can access all our after sales services.');
        }
        this.kiaProviderService.user_id = data.user_id;
        this.kiaProviderService.permissionLevel = data.register_status;
        // this.kiaProviderService.user_id="138";
        // this.kiaProviderService.permissionLevel=2;

        if (this.kiaProviderService.user_id == "0") {
          this.storedData();
        } else {
          this.router.navigateByUrl("/home");
        }
        console.log("user data", data, this.kiaProviderService.user_id, this.kiaProviderService.permissionLevel);
      },
        (error: any) => {
          console.log('Something went wrong!', error);
          this.Retry3();
        });
  }

  // sendDeviceID(deviceID:string) {
  //   console.log("test mode off")
  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   options: any = {
  //     "device_id":deviceID,
  //     "androidReview":false
  //   },

  //   // url: any = this.kiaProviderService.baseURL + 'appLoading';
  //   url: any = this.kiaProviderService.baseURL + 'v2/appLoading';

  //   this.http.post(url, JSON.stringify(options), headers)
  //   .subscribe((data: any) => {
  //     if(this.kiaProviderService.permissionLevel==1 && data.register_status==2){
  //       this.Congratulations('Your registration details are confirmed. Now you can access all our after sales services.');
  //     }
  //     this.kiaProviderService.user_id = data.user_id;
  //     this.kiaProviderService.permissionLevel=data.register_status;
  //     // this.kiaProviderService.user_id="138";
  //     // this.kiaProviderService.permissionLevel=2;

  //     if(this.kiaProviderService.user_id=="0"){
  //       this.storedData();
  //     }else{
  //       this.router.navigateByUrl("/home");
  //     }
  //     console.log("user data", data, this.kiaProviderService.user_id, this.kiaProviderService.permissionLevel);
  //   },
  //   (error: any) => {
  //     console.log('Something went wrong!', error);
  //     this.Retry1();
  //   });      
  // }

  // async Retry1() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert!',
  //     message: 'Check your connection and try again!',
  //     buttons: [{
  //         text: 'Try again',
  //         handler: () => {
  //           this.sendDeviceID(this.kiaProviderService.deviceId);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // sendDeviceIDTest(deviceID:string) {
  //   // console.log("test mode on")
  //   console.log("device_id sendDeviceIDTest",deviceID,
  //   "phone_number","0798234935",
  //   "androidReview",true)
  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   options: any = {
  //     "device_id":deviceID,
  //     "phone_number":"0798234935",
  //     "androidReview":true
  //   },

  //   url: any = this.kiaProviderService.baseURL + 'appLoading';

  //   this.http.post(url, JSON.stringify(options), headers)
  //   .subscribe((data: any) => {
  //     if(this.kiaProviderService.permissionLevel==1 && data.register_status==2){
  //       this.Congratulations('Your registration details are confirmed. Now you can access all our after sales services.');
  //     }

  //     this.kiaProviderService.user_id = data.user_id;
  //     this.kiaProviderService.permissionLevel=data.register_status;

  //     console.log("User id testing", this.kiaProviderService.user_id)
  //     if(this.kiaProviderService.user_id=="557"){
  //       console.log("User id testing 2", this.kiaProviderService.user_id)
  //       this.kiaProviderService.permissionLevel=2;
  //     }

  //     if(this.kiaProviderService.user_id=="0"){
  //       this.storedData();
  //     }else{
  //       this.router.navigateByUrl("/home");
  //     }
  //     console.log("user data", data);
  //   },
  //   (error: any) => {
  //     console.log('Something went wrong!', error);
  //     this.Retry2();
  //   });      
  // }

  // async Retry2() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert!',
  //     message: 'Check your connection and try again!',
  //     buttons: [{
  //         text: 'Try again',
  //         handler: () => {
  //           this.sendDeviceIDTest(this.kiaProviderService.deviceId);
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  async Retry3() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
        text: 'Try again',
        handler: () => {
          this.loadApp(this.kiaProviderService.user_phone);
        }
      }
      ]
    });
    await alert.present();
  }

  checkVehicleRegistration(newVehicleArray) {
    if (this.pendingVehiclesCount > 0) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any = {
          "user_id": this.kiaProviderService.user_id,
          "vehicle_id": newVehicleArray[this.pendingVehiclesCount - 1]
        },

        url: any = this.kiaProviderService.baseURL + 'getMyVehiclePendingStatus';

      this.http.post(url, JSON.stringify(options), headers)
        .subscribe((data: any) => {
          console.log("Vehicle registrations", data)
          if (data.verify_status) {
            this.Congratulations('Your ' + data.vehicle_no + ' vehicle registration details are confirmed.');
            newVehicleArray.splice(newVehicleArray.indexOf(this.pendingVehiclesCount), 1);
            this.storage.set("newVehicle", newVehicleArray);
            this.kiaProviderService.updateVehicle.next(true);
          }
          this.pendingVehiclesCount = this.pendingVehiclesCount - 1;
          if (this.pendingVehiclesCount > 0) {
            this.checkVehicleRegistration(newVehicleArray);
          }
        },
          (error: any) => {
            console.log('Something went wrong!', error);
          });
    }

  }

  async Congratulations(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Congratulations!',
      message: msg,
      buttons: [{
        text: 'Close',
        role: 'cancel',
        handler: () => {
          console.log('User has aknowladged about success of registration');
        }
      }
      ]
    });
    await alert.present();
  }

  checkPayment() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {},

      url: any = this.kiaProviderService.baseURL + 'disablePayment';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        // console.log("Online payment active", data)
        this.kiaProviderService.paymentOnline = data.isActive;
      },
        (error: any) => {
          console.log('Something went wrong!', error);
        });
  }

  async storedData() {
    let getStoredData = await this.storage.get("isNewUser");

    if (getStoredData == null) {
      this.storage.set("isNewUser", true);
      this.router.navigateByUrl("login");
    }
    else if (!getStoredData) {
      this.router.navigateByUrl("home");
    } else {
      this.router.navigateByUrl("login");
    }
  }
}
