import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
// import EstimateRequests from './../../assets/damageEstimateRequests.json';

@Component({
  selector: 'app-my-part-requests',
  templateUrl: './my-part-requests.page.html',
  styleUrls: ['./my-part-requests.page.scss'],
})
export class MyPartRequestsPage implements OnInit {
  estimateRequest:any=[];
  constructor(
    private router: Router,
    private http: HttpClient,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getPartRequests();
  }    

  gotoView(id){
    console.log(id);
    this.kiaProviderService.request_part_id = id;
    this.router.navigateByUrl("/request-part-view");
  }

  gotoPending(id){
    console.log(id);
    this.kiaProviderService.request_part_id = id;
    this.router.navigateByUrl("/request-part-view");
  }

  getPartRequests() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'getRequestPart';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("part requests data ", data);
      this.estimateRequest = data;
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
            this.getPartRequests();
          }
        }
      ]
    });
    await alert.present();
  }
}
