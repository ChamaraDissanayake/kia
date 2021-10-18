import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient) { 
    this.signup = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern('[A-Za-z ]{2,}')]],
      // email: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
      email:['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      vehicleNumber: ['', [Validators.required, Validators.minLength(6)]],
      // vehicleNumber: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[A-Za-z0-9]{2,}-[0-9]{4}$')]],
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
      { type: 'required', message: '* Vehicle number is required!' }
    ],
    'mobile': [
      { type: 'required', message: '* Mobile number is required!' },
      { type: 'pattern', message: '* Not a valid mobile number!' }
    ]
  };

  submitDetails(){
    console.log(this.signup.value);
    
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "name":this.signup.get('name').value,
			"email":this.signup.get('email').value,
			"phone":this.signup.get('mobile').value,
			"vehicle_no":this.signup.get('vehicleNumber').value.toUpperCase(),
			"device_id":this.kiaProviderService.deviceId
    },
      
    url: any = this.kiaProviderService.baseURL + 'addUsers';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      this.kiaProviderService.user_id = data.user_id
      this.kiaProviderService.permissionLevel=data.register_status;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry();
    });  
    this.router.navigateByUrl("/otp");
  }

  async Retry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.submitDetails();
          }
        }
      ]
    });
    await alert.present();
  }
}
