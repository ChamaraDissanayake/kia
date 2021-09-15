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
    private platform: Platform) {
    this.signup = this.formBuilder.group({
      vehicleNumber: [this.kiaProviderService.vehicle_id, [Validators.required, Validators.minLength(6), Validators.pattern('^[A-Za-z0-9]{2,}-[0-9]{4}$')]],
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
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'pattern', message: '* Vehicle number pattern AAA-1234' }
    ]
  };

  addNumber(v){
    console.log("add new vehicle",v.toUpperCase())
    this.router.navigateByUrl('/my-profile');
  }
  updateNumber(v){
    console.log("update vehicle",v)
    this.router.navigateByUrl('/my-profile');

  }
}
