import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.page.html',
  styleUrls: ['./accessories.page.scss'],
})
export class AccessoriesPage implements OnInit {
  accessoriesSwitch = 'accessories';
  vehicleModels: any = [];
  accessories: any = [];
  vehicleModalId: string ='';
  myOrders: any = [];
  isOnline: boolean = false;

  constructor(
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.getVehicleModels();
  }

  ionViewDidEnter(){
    this.getMyOrders();
  }

  getVehicleModels() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
    url: any = this.kiaProviderService.baseURL + 'get-vehicle-model';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      this.vehicleModels=data;
      console.log(data)
      this.getAllAccessories();
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
            this.getVehicleModels();
          }
        }
      ]
    });
    await alert.present();
  }

  getAllAccessories() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
    url: any = this.kiaProviderService.baseURL + 'getAccessories';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("all accessories", data)
      if(data.length){
        this.accessories = data;
        this.isOnline = true;
      }else{
        this.isOnline = false;
      }
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
            this.getAllAccessories();
          }
        }
      ]
    });
    await alert.present();
  }

  gotoViewAccossory(id){
    console.log(id)
    this.kiaProviderService.accessory_id = id;
    this.router.navigateByUrl('/accessories-view');
  }

  selectModel(event){
    this.vehicleModalId = event.target.value;
    this.getAccessoriesByModel();
  }

  getAccessoriesByModel() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "vehicle_model_id":this.vehicleModalId
    },
    url: any = this.kiaProviderService.baseURL + 'getAccessoriesByModel';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("accessories by id", data)
      this.accessories = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry3();
    }); 
  }

  async Retry3() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getAccessoriesByModel();
          }
        }
      ]
    });
    await alert.present();
  }

  getMyOrders() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'myOrderAccessories';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("my orders",data)
      this.myOrders = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry4();
    }); 
  }

  async Retry4() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getVehicleModels();
          }
        }
      ]
    });
    await alert.present();
  }
}
