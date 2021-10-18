import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pick-and-drop-book',
  templateUrl: './pick-and-drop-book.page.html',
  styleUrls: ['./pick-and-drop-book.page.scss'],
})
export class PickAndDropBookPage implements OnInit {
  public pickdrop : FormGroup;
  bookingData:any=[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController
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
      { type: 'pattern', message: '* Not a valid mobile number!' }
    ]
  };
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getBooking();
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

  bookPick() {
    console.log("booking id", this.kiaProviderService.booking_id)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_id":this.kiaProviderService.booking_id,
      "address":this.pickdrop.get('address').value,
      "phone":this.pickdrop.get('mobile').value,
      "user_id":this.kiaProviderService.user_id,
      "name":this.pickdrop.get('name').value,
    },
    url: any = this.kiaProviderService.baseURL + 'addPickAndDrop';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my book pick", data);
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
}
