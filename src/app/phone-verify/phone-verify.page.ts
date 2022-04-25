import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('vehicleAddFirst') vehicleAddFirst
  @ViewChild('vehicleAddLast') vehicleAddLast
  public signup: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient) {
    this.signup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z ]{2,}')]],
      lastname: ['', [Validators.required, Validators.pattern('[A-Za-z ]{2,}')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      mobile: ['', [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]],
      vehicleNumberFirst: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z]{2,}')]],
      vehicleNumberLast: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isSubmitted = false;
  }

  validation_messages = {
    'name': [
      { type: 'required', message: '* Name is required!' },
      { type: 'pattern', message: '* Not a valid name!' }
    ],
    'lastname': [
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
    ],
    'vehicleNumberFirst': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'minlength', message: '* Vehicle number includes at least 2 charactors!' }
    ],
    'vehicleNumberLast': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'minlength', message: '* Vehicle number includes 4 numbers!' }
    ]
  };

  submitDetails() {
    this.isSubmitted = true;
    let numberPlate = this.vehicleAddFirst.value.toUpperCase() + " " + this.vehicleAddLast.value;

    console.log(
      "name", this.signup.get('name').value,
      "lastname", this.signup.get('lastname').value,
      "email", this.signup.get('email').value,
      "phone", this.signup.get('mobile').value,
      "vehicle_no", numberPlate,
      "device_id", this.kiaProviderService.deviceId);

    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "name": this.signup.get('name').value,
        "lastname": this.signup.get('lastname').value,
        "email": this.signup.get('email').value,
        "phone": this.signup.get('mobile').value,
        "vehicle_no": numberPlate,
        "device_id": this.kiaProviderService.deviceId
      },

      url: any = this.kiaProviderService.baseURL + 'addUsers';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("Signup success", data);
        this.kiaProviderService.user_id = data.user_id
        this.kiaProviderService.permissionLevel = data.register_status;
        this.router.navigateByUrl("/otp");
      },
        (error: any) => {
          console.log('Something went wrong!', error);
          this.isSubmitted = false;
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
          this.submitDetails();
        }
      }
      ]
    });
    await alert.present();
  }

  controllerFirst() {
    if (this.vehicleAddFirst.value.length > 2) {
      console.log(this.vehicleAddFirst.value.length);
      this.vehicleAddLast.setFocus();
    }
  }

  controllerLast() {
    if (this.vehicleAddLast.value.length == 0) {
      console.log(this.vehicleAddFirst.value.length);
      this.vehicleAddFirst.setFocus();
    }
  }

  checkSpace(event) {
    console.log(event.which)
    if (event.which === 32) {
      return false;
    }
  }
}
