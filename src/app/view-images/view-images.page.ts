import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.page.html',
  styleUrls: ['./view-images.page.scss'],
})
export class ViewImagesPage implements OnInit {

  images: any = [];
  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    public kiaProviderService: KiaProviderService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getDetails();
  }

  getDetails(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "damage_estimate_id":this.kiaProviderService.damage_estimate_id
    },
    url: any = this.kiaProviderService.baseURL + 'getDamageEstimate';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("damage data ", data[0])
      this.images = data[0].imageList;
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
            this.getDetails();
          }
        }
      ]
    });
    await alert.present();
  }
}
