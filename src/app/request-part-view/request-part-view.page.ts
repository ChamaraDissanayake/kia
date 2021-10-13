import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-request-part-view',
  templateUrl: './request-part-view.page.html',
  styleUrls: ['./request-part-view.page.scss'],
})
export class RequestPartViewPage implements OnInit {
  imageURL: string = '';
  description: string = '';
  isAvailable:boolean = false;
  isView: boolean = false;
  partName: string = '';
  partNo: string = '';
  price: string = '';
  constructor(
    private http: HttpClient,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getRequestDetails();
    this.imageURL = 'https://cdn.kia.lk/kia-uploads/rio/rio_uraban_green_070.jpg';
  }

  getRequestDetails() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "request_part_id":this.kiaProviderService.request_part_id
    },
    url: any = this.kiaProviderService.baseURL + 'getRequestPartById';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("request data ", data);
      this.description = data.description;
      this.imageURL = data.image;
      this.isAvailable = data.isavailable;
      this.partName = data.part_name;
      this.partNo = data.part_no;
      this.price = data.price;
      this.isView = data.status;
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
            this.getRequestDetails();
          }
        }
      ]
    });
    await alert.present();
  }
}
