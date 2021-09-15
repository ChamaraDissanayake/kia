import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.page.html',
  styleUrls: ['./phone-verify.page.scss'],
})
export class PhoneVerifyPage implements OnInit {
  public signup : FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService) { 
    this.signup = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{2,}')]],
      // email: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      email:['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      vehicleNumber: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[A-Za-z0-9]{2,}-[0-9]{4}$')]],
      mobile:['', [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]]
    });
  }

  ngOnInit() {
  }
  
  ionViewWillLoad() {

  }

  validation_messages = {
    'name': [
      { type: 'required', message: '* Name is required!' },
      { type: 'pattern', message: '* Not a valid name!' }
    ],
    'email': [
      { type: 'required', message: '* Email is required!' },
      { type: 'pattern', message: '* Not a valid e-mail!' }
    ],
    'vehicleNumber': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'pattern', message: '* Vehicle number pattern AAA-1234' }
    ],
    'mobile': [
      { type: 'required', message: '* Mobile number is required!' },
      { type: 'pattern', message: '* Not a valid mobile number!' }
    ]
  };

  submitDetails(){
    console.log(this.signup.value);
    this.kiaProviderService.user_name = this.signup.get('name').value;
    this.kiaProviderService.user_phone = this.signup.get('mobile').value;
    this.kiaProviderService.user_email = this.signup.get('email').value;
    this.kiaProviderService.vehicle_id = this.signup.get('vehicleNumber').value;
    this.router.navigateByUrl("/otp");
  }
}
