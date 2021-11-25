import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import myProfile from '../../assets/myProfile.json'
import { KiaProviderService } from '../kia-provider.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  // profile = myProfile;
  profile: any=[];
  constructor(    
    // private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private storage: Storage
    ) { 
      this.kiaProviderService.updateVehicle.subscribe((value) => { 
        console.log(value);
        if (true === value) {
          console.log("Reload vehicles");
          this.getMyDetails();
          this.kiaProviderService.updateVehicle.next(false);
        } else {
          console.log("No need reload")
        }
     });
    }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getMyDetails();
  }

  gotoEditProfile(){
    console.log('gotoEditProfile');
    this.router.navigateByUrl('/my-profile-edit');
  }

  gotoUpdateVehicle(vehicle){
    this.kiaProviderService.vehicle_id = vehicle.vehicle_id;
    this.kiaProviderService.vehicle_number = vehicle.vehicle_no;
    this.router.navigateByUrl('/vehicle-add');
  }

  gotoAddVehicle(){
    this.kiaProviderService.vehicle_id = '';
    this.kiaProviderService.vehicle_number = '';
    this.router.navigateByUrl('/vehicle-add');
  }

  
  getMyDetails() {
    console.log(this.kiaProviderService.user_id, "user id")
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'myProfile';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("profile data ", data)
      this.profile=data[0];
      // this.myVehicles = data[0].vehicles;
      this.kiaProviderService.user_name = data[0].name;
      this.kiaProviderService.user_phone = data[0].phone_number;
      this.kiaProviderService.user_email = data[0].email;
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
            this.getMyDetails();
          }
        }
      ]
    });
    await alert.present();
  }

  async askDeleteVehicle(vehicle) {
    console.log(vehicle, "going to deleted")
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure you want to remove this vehicle?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteVehicle(vehicle);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteVehicle(vehicle) {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id,
      "vehicle_id":vehicle.vehicle_id
    },
    url: any = this.kiaProviderService.baseURL + 'removeVehicle';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("vehicle deleted ", data);
      this.getMyDetails();
      this.checkNewVehicles(vehicle.vehicle_id);
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
            this.getMyDetails();
          }
        }
      ]
    });
    await alert.present();
  }

  async checkNewVehicles(id){
    let newVehicleArray:any = [];
    let check = await this.storage.get("newVehicle");
    if(check){
      newVehicleArray = await this.storage.get("newVehicle");
      newVehicleArray.forEach(element => {
        if(id==element){
          newVehicleArray.splice(newVehicleArray.indexOf(element),1);
          console.log("Vehicle removed from validate array")
        }
      });
      this.storage.set("newVehicle", newVehicleArray);
    }
  }
}
