import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-test-drive-registration',
  templateUrl: './test-drive-registration.page.html',
  styleUrls: ['./test-drive-registration.page.scss'],
})
export class TestDriveRegistrationPage implements OnInit {
  public signup : FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService) { 
    this.signup = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern('[A-Za-z ]{3,}')]],
      email:['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      mobile:['', [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]]
    });
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
    'mobile': [
      { type: 'required', message: '* Mobile number is required!' },
      { type: 'pattern', message: '* Not a valid mobile number!' }
    ]
  };

  submitDetails(){
    console.log(this.signup.value);
    // this.kiaProviderService.fromLogin = false;
    this.kiaProviderService.from = 'test-drive-registration';
    this.kiaProviderService.customer_name = this.signup.get('name').value;
    this.kiaProviderService.customer_phone = this.signup.get('mobile').value;
    this.kiaProviderService.customer_email = this.signup.get('email').value;
    console.log(this.kiaProviderService.customer_name, this.kiaProviderService.customer_phone, this.kiaProviderService.customer_email);
    this.router.navigateByUrl("/otp");
  }

  ngOnInit() {
  }

}
