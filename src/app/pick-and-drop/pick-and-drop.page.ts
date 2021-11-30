import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-pick-and-drop',
  templateUrl: './pick-and-drop.page.html',
  styleUrls: ['./pick-and-drop.page.scss'],
})
export class PickAndDropPage implements OnInit {
  bookings:any = [];
  pricing:any = [];
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
    this.kiaProviderService.pickMap = false;
    this.kiaProviderService.pickLatitude = 0;
    this.kiaProviderService.pickLongitude = 0;
  }

  getMyBookings() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'myBookingForPickAndDrop';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my bookings ", data);
      this.bookings = data;
      this.getPricing();
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

  getPricing() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      
    },
    url: any = this.kiaProviderService.baseURL + 'PickAndDropPrice';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my pricing ", data);
      this.pricing = data;
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
            this.getPricing();
          }
        }
      ]
    });
    await alert.present();
  }

  bookPickAndDrop(id){
    console.log("pick & drop id",id)
    this.kiaProviderService.booking_id = id;    
    this.router.navigateByUrl("/pick-and-drop-book");
  }
}
