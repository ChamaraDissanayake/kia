import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
import payList from '../../assets/getInvoices.json';
import { AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-online-payment-select',
  templateUrl: './online-payment-select.page.html',
  styleUrls: ['./online-payment-select.page.scss'],
})
export class OnlinePaymentSelectPage implements OnInit {
  total: number = 0;
  bills: any = [];
  indexes: any = [];
  payList: any = [];
  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController,
    private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.bills = payList;
  }

  selectInvoce(ev){
    let event = ev.detail;
    console.log(event, "online payment select")
    let isChecked = event.checked;
    // let refNo = event.value.substring(0,event.value.indexOf(","));
    let amount: number = event.value.substring(event.value.indexOf(",")+1, event.value.indexOf("+"));
    let index: number = event.value.substring(event.value.indexOf("+")+1, event.value.length);
    if(isChecked){
      this.total = Number(this.total) + Number(amount);
      this.indexes.push(index)
    }else{
      this.total = Number(this.total) - Number(amount);
      this.indexes.splice(this.indexes.indexOf(index),1)
    }
    console.log(this.indexes)
  }

  pay(){
    this.payList=[];
    this.indexes.forEach(element => {
      this.payList.push(this.bills[element]);
    });
    
    console.log(this.payList)
    setTimeout(() => {
      this.sendData();
    }, 1000);
  }

  sendData(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id": this.kiaProviderService.user_id,
      "invoiceList": this.payList
    },
    url: any = this.kiaProviderService.baseURL + 'add-invoices';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("payment", data.url)
      this.inAppBrowser.create(data.url);
      //4508 7500 1574 1019
      this.router.navigateByUrl('/home');
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry()
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
            this.sendData();
          }
        }
      ]
    });
    await alert.present();
  }
}