import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
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
    private modalController: ModalController) { }

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
          this.getMyBookings();
        }
      }
      ]
    });
    await alert.present();
  }

  addRating(rate) {
    this.rating = rate;
    console.log(this.rating);
  }

  async cancelBookingRequest(id) {
    this.kiaProviderService.booking_id = id;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
        text: 'Cancel booking',
        handler: () => {
          this.cancelBooking(id);
        }
      },{
        text: 'Back',
        role: 'cancel'
      }
      ]
    });
    await alert.present();
  }
  
  cancelBooking(id) {
    console.log("cancel id", id);
  }

  // async rate(){
  //   const alert = await this.alertController.create({
  //     header: 'Rate us',
  //     cssClass: 'alertstar',
  //     backdropDismiss:false,
  //     buttons: [{
  //       text: 'Submit',
  //       handler: () => {
  //         this.submitRating();
  //       }
  //     }
  //   ],
  //     inputs: [
  //       {
  //         type: 'checkbox',
  //         value: '1',
  //         handler: () => {
  //           console.log('Radio 1 selected');
  //         },
  //         checked: true
  //       },
  //       {
  //         type: 'checkbox',
  //         value: '1',
  //         handler: () => {
  //           console.log('Radio 1 selected');
  //         },
  //         checked: true
  //       }]
  // });
  // await alert.present();
  // }
}
