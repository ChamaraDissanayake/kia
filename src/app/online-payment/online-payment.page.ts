import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
// import payList from '../../assets/getInvoices.json';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.page.html',
  styleUrls: ['./online-payment.page.scss'],
})
export class OnlinePaymentPage implements OnInit {
  bills: any = [];
  showLoader: boolean = false;
  constructor(
    // private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
    // this.bills = payList;
  }

  ionViewDidEnter(){
    this.getBillList();
  }

  getBillList() {
    this.showLoader = true;
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'getInvoices';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("Bills", data);
      this.bills = data;
      this.showLoader = false;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.showLoader = false;
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
            this.getBillList();
          }
        }
      ]
    });
    await alert.present();
  }
}
