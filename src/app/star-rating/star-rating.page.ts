import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.page.html',
  styleUrls: ['./star-rating.page.scss'],
})

export class StarRatingPage implements OnInit {
  @ViewChild('note') note: any;
  rating: number = 0;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private kiaProviderService: KiaProviderService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  addRating(rate){
    this.rating = rate;
    console.log(this.rating, this.note.value);
  }

  submitRating() {
    console.log(
    "user_id",this.kiaProviderService.user_id,
    "booking_id",this.kiaProviderService.booking_id,
    "rate",this.rating,
    "feedback",this.note.value);

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id,
      "booking_id":this.kiaProviderService.booking_id,
      "rate":this.rating,
      "feedback":this.note.value
    },
    url: any = this.kiaProviderService.baseURL + 'addMyBookingRate';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("rating data ", data);
      this.close();
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry();
    });
  }

  async close(){
    await this.modalController.dismiss();
  }

  async Retry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.submitRating();
          }
        }
      ]
    });
    await alert.present();
  }
}
