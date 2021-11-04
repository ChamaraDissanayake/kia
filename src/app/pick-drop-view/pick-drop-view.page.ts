import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-pick-drop-view',
  templateUrl: './pick-drop-view.page.html',
  styleUrls: ['./pick-drop-view.page.scss'],
})
export class PickDropViewPage implements OnInit {
  pd_status: string = ''
  pd_driver_name: string = ''
  pd_driver_nic: string = ''
  pd_driver_phone: string = ''

  constructor(
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController,
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.getPickBookings();
  }

  getPickBookings() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "booking_id":this.kiaProviderService.booking_id
    },
    url: any = this.kiaProviderService.baseURL + 'getMyPickAndDropForCheckStatus';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my picks", data);
      this.pd_status = data[0].status;

      switch (data[0].status) {
        case 1:
          this.pd_status = "Pending"
          break;
  
        case 2:
          this.pd_status = "Accept"
          break;
  
        case 3:
          this.pd_status = "Pickup dispatch"
          break;

        case 4:
          this.pd_status = "Vehicle received"
          break;

        case 5:
          this.pd_status = "Drop dispatch"
          break;

        case 6:
          this.pd_status = "Drop Complete"
          break;
  
        default:
          this.pd_status = "Pending"
      }

      this.pd_driver_name = data[0].driver_name;
      this.pd_driver_nic = data[0].driver_nic;
      this.pd_driver_phone = data[0].driver_phone;
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
            this.getPickBookings();
          }
        }
      ]
    });
    await alert.present();
  }

  call(){
    this.callNumber.callNumber(this.pd_driver_phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
