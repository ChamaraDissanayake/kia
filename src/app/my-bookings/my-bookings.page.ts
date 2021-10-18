import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
// import myAllBookings from './../../assets/allBookings.json';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {
  allBookings: any=[];
  //  = myAllBookings;
  constructor(
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getMyBookings();
  }

  getMyBookings() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
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
}
