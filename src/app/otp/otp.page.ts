import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  @ViewChild('otp1') otp1;
  @ViewChild('otp2') otp2;
  @ViewChild('otp3') otp3;
  @ViewChild('otp4') otp4;
  constructor(private router: Router, public kiaProviderService: KiaProviderService) { }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.reset();
  }

  reset() {
    this.otp1.value = '';
    this.otp2.value = '';
    this.otp3.value = '';
    this.otp4.value = '';
    this.isValid = false;
  }

  OTP: any = { first: '', second: '', third: '', fourth: ''};
  isValid: boolean = false

  otpController(event, next, prev) {

    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      console.log("full or empty");
    }

    if (this.otp1.value && this.otp2.value && this.otp3.value && this.otp4.value) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  next(){
    if(this.kiaProviderService.from=='login'){
      this.router.navigateByUrl("/home");
    }else{
      this.router.navigateByUrl("/booking-confirmed");
    }
  }
}
