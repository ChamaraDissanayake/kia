import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-pick-and-drop-bookings',
  templateUrl: './pick-and-drop-bookings.page.html',
  styleUrls: ['./pick-and-drop-bookings.page.scss'],
})
export class PickAndDropBookingsPage implements OnInit {
  bookings:any = [];
  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController
  ) { }

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
    url: any = this.kiaProviderService.baseURL + 'getMyPickAndDrop';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my bookings ", data);
      this.bookings = data;
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

  viewPickAndDrop(id){
    console.log("view pick & drop",id)
    this.kiaProviderService.booking_id = id;
    this.router.navigateByUrl("/pick-drop-view");
  }
}
