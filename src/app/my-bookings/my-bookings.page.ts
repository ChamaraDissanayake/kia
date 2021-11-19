import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
// import myAllBookings from './../../assets/allBookings.json';
import { ModalController } from '@ionic/angular';
import { StarRatingPage } from '../star-rating/star-rating.page';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {
  allBookings: any = [];
  rating: number = 0;
  modal: any
  //  = myAllBookings;
  constructor(
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient,
    private modalController: ModalController,
    private toastController: ToastController) 
  {
    this.kiaProviderService.rated.subscribe((value) => { 
      console.log(value);
      if (true === value) {
        console.log("Rated and reloading")
        this.getMyBookings();
        this.kiaProviderService.rated.next(false);
      } else {
        console.log("Not rated")
      }
   });
  }

  async showModal(id) {
    this.kiaProviderService.booking_id = id;
    this.modal = await this.modalController.create({
      component: StarRatingPage,
      cssClass: 'star-modal',
      backdropDismiss: false
    })
    await this.modal.present();
  }
  ngOnInit() {
    
  }

  ngOnChanges(){
    console.log("Change")
  }

  ionViewDidEnter() {
    this.getMyBookings();
  }

  ionViewWillLeave(){
    if(this.modal){
      this.modal.dismiss();
    }
  }
  
  getMyBookings() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "user_id": this.kiaProviderService.user_id
      },
      url: any = this.kiaProviderService.baseURL + 'myBooking';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("my bookings ", data);
        this.allBookings = data;
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
          this.getMyBookings();
        }
      }
      ]
    });
    await alert.present();
  }

  cancelBooking(id, note){
    console.log(id, note);
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "user_id": this.kiaProviderService.user_id,
        "booking_id":id,
        "note":note
      },
      url: any = this.kiaProviderService.baseURL + 'cancelBooking';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("cancel bookings ", data);
        this.presentToast()
        this.getMyBookings();
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
          this.getMyBookings();
        }
      }
      ]
    });
    await alert.present();
  }

  // addRating(rate) {
  //   this.rating = rate;
  //   console.log(this.rating);
  // }

  async cancelBookingRequest(id) {
    this.kiaProviderService.booking_id = id;
    const alert = await this.alertController.create({
      cssClass: 'cancel-booking',
      message: 'Please state the reason for cancelling.',
      inputs:[{
          name: 'note',
          type: 'text',
          placeholder: 'State reason'
        }
      ],
      buttons: [{
        text: 'Cancel booking',
          handler: (alertData) => {
            this.cancelBooking(id, alertData.note);
            this.presentToast();
          }
        },
        {
          text: 'Back',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully deleted!',
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }
}
