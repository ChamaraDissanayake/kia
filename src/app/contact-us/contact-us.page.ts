import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  public phoneNo:string ='011 750 8708';
  public eMail:string ='info@kialanka.lk';
  constructor(
    private callNumber: CallNumber,
    private alertController: AlertController,
    private http: HttpClient,
    public kiaProviderService: KiaProviderService) { }

  ngOnInit() {
    this.getPhoneNumber();
  }

  getPhoneNumber(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {

    },
    url: any = this.kiaProviderService.baseURL + 'contactUs';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      this.phoneNo = data.phone;
      this.eMail = data.email;
      console.log("contact us", data)
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
            this.getPhoneNumber();
          }
        }
      ]
    });
    await alert.present();
  }

  call(){
    this.callNumber.callNumber(this.phoneNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}