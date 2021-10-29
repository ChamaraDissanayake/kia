import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.page.html',
  styleUrls: ['./vehicle-add.page.scss'],
})
export class VehicleAddPage implements OnInit {
  @ViewChild('vehicleAddFirst') vehicleAddFirst
  @ViewChild('vehicleAddLast') vehicleAddLast

  public signup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient,
    private platform: Platform) {
    this.signup = this.formBuilder.group({
      // vehicleNumberFirst: [this.kiaProviderService.vehicle_number, [Validators.required, Validators.minLength(2), Validators.maxLength(3), Validators.pattern('[A-Za-z]')]],
      // vehicleNumberLast: [this.kiaProviderService.vehicle_number, [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]')]]
      // this.kiaProviderService.vehicle_number.substring(0,this.kiaProviderService.vehicle_number.indexOf(' '))
      // this.kiaProviderService.vehicle_number.indexOf(' ')+1,this.kiaProviderService.vehicle_number.length
      vehicleNumberFirst: [
        this.kiaProviderService.vehicle_number.substring(0,this.kiaProviderService.vehicle_number.indexOf(' ')),
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z]{2,}')
        ]
      ],
      vehicleNumberLast: [
        this.kiaProviderService.vehicle_number.substring(this.kiaProviderService.vehicle_number.indexOf(' ')+1,this.kiaProviderService.vehicle_number.length),
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });
  }

  ngOnInit() {
    // this.platform.ready().then(()=>{
    //   console.log(this.kiaProviderService.vehicle_id)
    //   if(this.kiaProviderService.vehicle_id!='0'){
    //     this.vehicle.value = this.kiaProviderService.vehicle_id;
    //   }
    // });
    console.log(this.kiaProviderService.vehicle_number, 'index of space')
  }

  validation_messages = {
    'vehicleNumberFirst': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'minlength', message: '* Vehicle number includes at least 2 charactors!' }
    ],
    'vehicleNumberLast': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'minlength', message: '* Vehicle number includes 4 numbers!' }
    ]
  };

  addNumber(){
    let numberPlate = this.vehicleAddFirst.value.toUpperCase()+" "+this.vehicleAddLast.value;
    console.log(numberPlate);
    this.kiaProviderService.vehicle_id="";
    this.kiaProviderService.vehicle_number=numberPlate;
    this.AddVehicle();
  }

  updateNumber(){
    let numberPlate = this.vehicleAddFirst.value.toUpperCase()+" "+this.vehicleAddLast.value;
    this.kiaProviderService.vehicle_number=numberPlate;
    this.AddVehicle();
  }

  AddVehicle() {
    console.log(
      this.kiaProviderService.user_id,
      this.kiaProviderService.vehicle_id,
      this.kiaProviderService.vehicle_number)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id,
      "vehicle_id":this.kiaProviderService.vehicle_id,
      "vehicle_number":this.kiaProviderService.vehicle_number
    },
    url: any = this.kiaProviderService.baseURL + 'addNewVehicle';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("profile data ", data);
      this.router.navigateByUrl('/my-profile');
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
            this.AddVehicle();
          }
        }
      ]
    });
    await alert.present();
  }

  controllerFirst(){
    if(this.vehicleAddFirst.value.length>2){
      console.log(this.vehicleAddFirst.value.length);
      this.vehicleAddLast.setFocus();
    }
  }
  
  controllerLast(){
    if(this.vehicleAddLast.value.length==0){
      console.log(this.vehicleAddFirst.value.length);
      this.vehicleAddFirst.setFocus();
    }
  }
}
