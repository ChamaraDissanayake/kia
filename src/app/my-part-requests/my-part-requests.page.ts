import { Component, OnInit } from '@angular/core';
import EstimateRequests from './../../assets/damageEstimateRequests.json';

@Component({
  selector: 'app-my-part-requests',
  templateUrl: './my-part-requests.page.html',
  styleUrls: ['./my-part-requests.page.scss'],
})
export class MyPartRequestsPage implements OnInit {
  estimateRequest:any;
  constructor(
    
  ) { }

  ngOnInit() {
    this.estimateRequest = EstimateRequests
  }

  gotoView(id){
    console.log(id);
  }

  gotoRespond(id){
    console.log(id);
  }
}
