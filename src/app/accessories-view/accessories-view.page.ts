import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-accessories-view',
  templateUrl: './accessories-view.page.html',
  styleUrls: ['./accessories-view.page.scss'],
})
export class AccessoriesViewPage implements OnInit {

  accessoryId: number = 0;
  description: string = '';
  image: string = '';
  name: string = '';
  price: string = '';
  isAvailable: boolean = false;

  constructor(
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAccessoryData()
  }




  getAccessoryData() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "accessory_id": this.kiaProviderService.accessory_id
      },
      url: any = this.kiaProviderService.baseURL + 'getAccessoriesById';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("accessory data", data)
        this.description = data.description;
        this.image = data.image;
        this.name = data.name;
        this.price = data.price;
        this.isAvailable = data.available;
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
          this.getAccessoryData();
        }
      }
      ]
    });
    await alert.present();
  }


  requestAccessory() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "accessory_id":this.kiaProviderService.accessory_id,
        "user_id":this.kiaProviderService.user_id
      },
      url: any = this.kiaProviderService.baseURL + 'orderAccessories';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("accessory request", data)
        this.router.navigateByUrl('/accessories');
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
          this.requestAccessory();
        }
      }
      ]
    });
    await alert.present();
  }
}
