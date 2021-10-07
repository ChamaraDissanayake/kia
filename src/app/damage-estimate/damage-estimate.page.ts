import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
// import estimateRequests from './../../assets/damageEstimateRequests.json';

@Component({
  selector: 'app-damage-estimate',
  templateUrl: './damage-estimate.page.html',
  styleUrls: ['./damage-estimate.page.scss'],
})
export class DamageEstimatePage implements OnInit {

  estimateRequest;
  // = estimateRequests;
  constructor(    
    private http: HttpClient,
    private router: Router,
    public kiaProviderService: KiaProviderService
    ) { }

// https://www.youtube.com/watch?v=2C66eWfZdmU
  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getAllData();
  }
  
  getAllData() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'getAllDamageEstimate';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("damage data ", data);
      this.estimateRequest = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    }); 
  }

  gotoRespond(id){
    this.kiaProviderService.damage_estimate_id = id;
    this.router.navigateByUrl('/damage-estimate-respond');
  }

  gotoView(id){
    this.kiaProviderService.damage_estimate_id = id;
    this.kiaProviderService.isDamageEstimatePending = false;
    this.router.navigateByUrl('/damage-estimate-view');
  }

  gotoPending(id){
    this.kiaProviderService.damage_estimate_id = id;
    this.kiaProviderService.isDamageEstimatePending = true;
    this.router.navigateByUrl('/damage-estimate-view');
  }
}
