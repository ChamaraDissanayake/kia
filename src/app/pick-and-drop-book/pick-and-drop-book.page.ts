import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DisclaimerPage } from '../disclaimer/disclaimer.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
// import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pick-and-drop-book',
  templateUrl: './pick-and-drop-book.page.html',
  styleUrls: ['./pick-and-drop-book.page.scss'],
})
export class PickAndDropBookPage implements OnInit {
  public pickdrop : FormGroup;
  bookingData:any=[];
  modal: any;
  isLocationAdded: boolean = false;
  private liveLatitude: number = 0;
  private liveLongitude: number = 0;
  @ViewChild("radioLocation")radioLocation;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController,
    private modalController: ModalController,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {
    this.pickdrop = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern('[A-Za-z ]{2,}')]],
      address: ['', [Validators.required, Validators.pattern('[A-Za-z0-9\.\-\s\, ]{10,}')]],
      mobile:['', [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]]
    });
  }

  
  validation_messages = {
    'name': [
      { type: 'required', message: '* Name is required!' },
      { type: 'pattern', message: '* Not a valid name!' }
    ],
    'address': [
      { type: 'required', message: '* Address is required!' },
      { type: 'pattern', message: '* Not a valid address!' }
    ],
    'mobile': [
      { type: 'required', message: '* Mobile number is required!' },
      { type: 'pattern', message: '* Not valid! Try 07XXXXXXXX' }
    ]
  };
  ngOnInit() {
  }

  ionViewWillEnter(){
    if(!this.kiaProviderService.pickMap){
      this.showModal();
      this.getBooking();      
    }else{
      this.kiaProviderService.pickMap = false;
    }
  }

  getBooking() {
    console.log("booking id", this.kiaProviderService.booking_id)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_id":this.kiaProviderService.booking_id
    },
    url: any = this.kiaProviderService.baseURL + 'viewBookingForPickAndDrop';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my booking", data);
      this.bookingData=data;
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
            this.getBooking();
          }
        }
      ]
    });
    await alert.present();
  }

  bookPickup(){
    if(this.isLocationAdded){
      if(this.radioLocation.value==1){
        console.log("Curernt location added");
        this.kiaProviderService.pickLatitude = this.liveLatitude;
        this.kiaProviderService.pickLongitude = this.liveLongitude;
        this.bookPickWithLocation();
      }else{
        console.log("Manual location added");
        this.bookPickWithLocation();
      }
    }else{
      this.bookPick();
      console.log("Location not added");
    }
  }

  bookPick() {
    console.log("booking id", this.kiaProviderService.booking_id, this.kiaProviderService.pickLatitude)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_id":this.kiaProviderService.booking_id,
      "address":this.pickdrop.get('address').value,
      "phone":this.pickdrop.get('mobile').value,
      "user_id":this.kiaProviderService.user_id,
      "name":this.pickdrop.get('name').value
    },
    url: any = this.kiaProviderService.baseURL + 'addPickAndDrop';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my book pick", data);
      this.isLocationAdded = false;
      this.router.navigateByUrl("/booking-confirmed");
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
            this.bookPick();
          }
        }
      ]
    });
    await alert.present();
  }

  bookPickWithLocation() {
    console.log("booking id", this.kiaProviderService.booking_id, this.kiaProviderService.pickLatitude)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_id":this.kiaProviderService.booking_id,
      "address":this.pickdrop.get('address').value,
      "phone":this.pickdrop.get('mobile').value,
      "user_id":this.kiaProviderService.user_id,
      "name":this.pickdrop.get('name').value,
      "latitude":this.kiaProviderService.pickLatitude,
      "longitude":this.kiaProviderService.pickLongitude
    },
    url: any = this.kiaProviderService.baseURL + 'addPickAndDrop';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my book pick", data);
      this.isLocationAdded = false;
      this.router.navigateByUrl("/booking-confirmed");
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
            this.bookPickWithLocation();
          }
        }
      ]
    });
    await alert.present();
  }

  async showModal() {
    this.modal = await this.modalController.create({
      component: DisclaimerPage,
      cssClass: 'disclaimer-modal',
      backdropDismiss: false
    })
    await this.modal.present();
  }

  ionViewWillLeave(){
    if(this.modal){
      this.modal.dismiss();
    }
  }

  addPickupLocation(){
    this.isLocationAdded = !this.isLocationAdded;
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        console.log("can request", canRequest);
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            console.log('Request successful');            
            this.getLocation();
        }, error => {
          console.log('Error requesting location permissions', error);
          this.isLocationAdded=false;            
        });
      }else{     
        console.log("No need to request", canRequest);   
        this.getLocation();
      }
    });
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("geolocation", resp.coords.latitude, resp.coords.longitude);
      this.liveLatitude = resp.coords.latitude;
      this.liveLongitude = resp.coords.longitude;
    }).catch((error) => {
      alert("Sorry! Your current location can not be identified.")
      console.log('Error getting location', error);
    });
  }

  pickLocation(){
    this.kiaProviderService.pickMap = true;
    this.kiaProviderService.pickLatitude = this.liveLatitude;
    this.kiaProviderService.pickLongitude = this.liveLongitude;
    this.router.navigateByUrl("/pick-and-drop-location");
  }
}
