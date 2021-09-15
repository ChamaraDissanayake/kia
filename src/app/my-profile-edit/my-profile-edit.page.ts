import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
import myProfile from '../../assets/myProfile.json'

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.page.html',
  styleUrls: ['./my-profile-edit.page.scss'],
})
export class MyProfileEditPage implements OnInit {
  public signup : FormGroup;

  @ViewChild('myName') myName;

  profile = myProfile;
  constructor(    
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private platform: Platform) {
      this.signup = this.formBuilder.group({
        email:[this.profile.my_email, [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
        mobile:[this.profile.my_tel_no, [Validators.required, Validators.pattern('[0]{1}[7]{1}[0-9]{8}'), Validators.minLength(10)]]
      });
     }

  ngOnInit() {
    this.platform.ready().then(()=>{
      this.myName.value = this.profile.my_name;
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: '* New email required!' },
      { type: 'pattern', message: '* Not a valid e-mail!' }
    ],
    'mobile': [
      { type: 'required', message: '* New mobile number required!' },
      { type: 'pattern', message: '* Not a valid mobile number!' }
    ]
  };

  updateDetails(){
    console.log(this.signup.get('email').value, this.signup.get('mobile').value);
    this.router.navigateByUrl('/my-profile');
  }

}
