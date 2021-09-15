import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
import estimateRequests from './../../assets/damageEstimateRequests.json';

@Component({
  selector: 'app-damage-estimate',
  templateUrl: './damage-estimate.page.html',
  styleUrls: ['./damage-estimate.page.scss'],
})
export class DamageEstimatePage implements OnInit {

  estimateRequest = estimateRequests;
  constructor(    
    // private platform: Platform,

    private router: Router,
    // public kiaProviderService: KiaProviderService
    ) { }

// https://www.youtube.com/watch?v=2C66eWfZdmU
  ngOnInit() {
  }

  gotoRespond(){
    this.router.navigateByUrl('/damage-estimate-respond');
  }

  gotoView(){
    this.router.navigateByUrl('/damage-estimate-view');
  }

  gotoImageUpload(){
    this.router.navigateByUrl('/damage-image-upload');
  }
}
