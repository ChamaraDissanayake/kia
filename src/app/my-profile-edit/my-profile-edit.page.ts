import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
// import myProfile from '../../assets/myProfile.json'

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.page.html',
  styleUrls: ['./my-profile-edit.page.scss'],
})
export class MyProfileEditPage implements OnInit {
  public signup : FormGroup;

  @ViewChild('myName') myName;

  // profile = myProfile;
  constructor(    
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private platform: Platform,
    private http: HttpClient) {
      this.signup = this.formBuilder.group({
        email:[this.kiaProviderService.user_email, [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
        mobile:[this.kiaProviderService.user_phone, [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]]
      });
     }

  ngOnInit() {
    this.platform.ready().then(()=>{
      this.myName.value = this.kiaProviderService.user_name;
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: '* New email required!' },
      { type: 'pattern', message: '* Not a valid e-mail!' }
    ],
    'mobile': [
      { type: 'required', message: '* New mobile number required!' },
      { type: 'pattern', message: '* Not valid! Try 07XXXXXXXX' }
    ]
  };
  
  updateDetails() {
    let phoneUpdated: boolean = true;
    console.log(this.signup.get('email').value, this.signup.get('mobile').value);
    if(this.kiaProviderService.user_phone == this.signup.get('mobile').value){
      console.log("phone not updated");
      phoneUpdated = false;
    }else{
      console.log("phone updated");
      phoneUpdated = true;
    }

    console.log(this.kiaProviderService.user_id, "user id")
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id,
      "phone_number":this.signup.get('mobile').value,
      "email":this.signup.get('email').value,
      "phoneUpdated":phoneUpdated
    },
    url: any = this.kiaProviderService.baseURL + 'editProfile';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("profile data ", data)
      this.kiaProviderService.user_email == this.signup.get('email').value;
      if(phoneUpdated){
        this.kiaProviderService.user_phone == this.signup.get('mobile').value
        this.kiaProviderService.from = "update";
        this.router.navigateByUrl('/otp');
      }else{
        this.router.navigateByUrl('/my-profile');
      }
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
            this.updateDetails();
          }
        }
      ]
    });
    await alert.present();
  }
}
