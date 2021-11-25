import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient) { 
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
      { type: 'pattern', message: '* Not valid! Try 07XXXXXXXX' }
    ]
  };

  submitDetails(){
    this.kiaProviderService.from = 'test_drive';
    console.log(this.kiaProviderService.user_id)

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "deviceId":this.kiaProviderService.deviceId,
      "user_id":this.kiaProviderService.user_id,
      "showroom_id":this.kiaProviderService.showroom_id,
      "booking_type":this.kiaProviderService.booking_type,
      "date":this.kiaProviderService.date,
      "phone_number":this.signup.get('mobile').value,
      "customer_name":this.signup.get('name').value,
      "customer_email":this.signup.get('email').value
      },
    url: any = this.kiaProviderService.baseURL + 'addTestDrive';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("submitted ",data)
      this.kiaProviderService.booking_id = data.booking_id;
      this.router.navigateByUrl("/otp");
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry();
    }); 
  }

  ngOnInit() {
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
