import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.page.html',
  styleUrls: ['./vehicle-add.page.scss'],
})
export class VehicleAddPage implements OnInit {
  @ViewChild('vehicle') vehicle

  public signup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private platform: Platform) {
    this.signup = this.formBuilder.group({
      vehicleNumber: [this.kiaProviderService.vehicle_number, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    // this.platform.ready().then(()=>{
    //   console.log(this.kiaProviderService.vehicle_id)
    //   if(this.kiaProviderService.vehicle_id!='0'){
    //     this.vehicle.value = this.kiaProviderService.vehicle_id;
    //   }
    // });
  }

  validation_messages = {
    'vehicleNumber': [
      { type: 'required', message: '* Vehicle number is required!' }
    ]
  };

  addNumber(vehicleNum){
    this.kiaProviderService.vehicle_id="";
    this.kiaProviderService.vehicle_number=vehicleNum.toUpperCase();
    this.AddVehicle();
  }
  updateNumber(vehicleNum){
    this.kiaProviderService.vehicle_number=vehicleNum.toUpperCase();
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
    }); 
  }
}
