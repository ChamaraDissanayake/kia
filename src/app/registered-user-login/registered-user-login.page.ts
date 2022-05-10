import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-registered-user-login',
  templateUrl: './registered-user-login.page.html',
  styleUrls: ['./registered-user-login.page.scss'],
})
export class RegisteredUserLoginPage implements OnInit {

  public signup: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient) {
    this.signup = this.formBuilder.group({      
      mobile: ['', [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]]      
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.isSubmitted = false;
  }

  validation_messages = {
    'mobile': [
      { type: 'required', message: '* Mobile number is required!' },
      { type: 'pattern', message: '* Not valid! Try 07XXXXXXXX' }
    ]
  };

  // submitDetails() {
  //   this.isSubmitted = true;

  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     options: any = {
  //       "phone": this.signup.get('mobile').value,
  //       "androidReview":false
  //     },

  //     url: any = this.kiaProviderService.baseURL + 'addUsers';

  //   this.http.post(url, JSON.stringify(options), headers)
  //     .subscribe((data: any) => {
  //       console.log("Signup success", data);
  //       this.kiaProviderService.user_phone = this.signup.get('mobile').value;
  //       this.kiaProviderService.user_id = data.user_id
  //       this.kiaProviderService.permissionLevel = data.register_status;
  //       this.router.navigateByUrl("/otp");
  //     },
  //       (error: any) => {
  //         console.log('Something went wrong!', error);
  //         this.isSubmitted = false;
  //         this.Retry();
  //       });
  // }

  login() {
    this.isSubmitted = true;
    console.log("Load app phone", this.signup.get('mobile').value)
    // let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    //   options: any = {
    //     "phone": phone,
    //     "androidReview": false
    //   },

    //   // url: any = this.kiaProviderService.baseURL + 'appLoading';
    //   url: any = this.kiaProviderService.baseURL + 'v2/appLoading';

    // this.http.post(url, JSON.stringify(options), headers)
    //   .subscribe((data: any) => {
    //     this.kiaProviderService.user_id = data.user_id;
    //     this.kiaProviderService.permissionLevel = data.register_status;

    //     this.router.navigateByUrl("/home");
    //   },
    //     (error: any) => {
    //       this.isSubmitted = false;
    //       console.log('Something went wrong!', error);
    //       this.Retry();
    //     });
  }

  async Retry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
        text: 'Try again',
        handler: () => {
          this.login();
        }
      }
      ]
    });
    await alert.present();
  }

}
