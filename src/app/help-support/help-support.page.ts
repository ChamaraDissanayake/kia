import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.page.html',
  styleUrls: ['./help-support.page.scss'],
})
export class HelpSupportPage implements OnInit {
  videoData: any =[];

  constructor(
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
      
    url: any = this.kiaProviderService.baseURL + 'helpAndSupport';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("videos", data);
      this.videoData = data;
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
            this.getVideos();
          }
        }
      ]
    });
    await alert.present();
  }
}
