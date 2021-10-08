import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
import payList from '../../assets/getInvoices.json';

@Component({
  selector: 'app-online-payment-select',
  templateUrl: './online-payment-select.page.html',
  styleUrls: ['./online-payment-select.page.scss'],
})
export class OnlinePaymentSelectPage implements OnInit {
  total: number = 0;
  bills: any = [];
  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient) { }

  ngOnInit() {
    this.bills = payList;
  }

  selectInvoce(event){
    console.log(event)
    let isChecked = event.checked;
    let refNo = event.value.substring(0,event.value.indexOf(","));
    let amount: number = event.value.substring(event.value.indexOf(",")+1, event.value.length);
    if(isChecked){
      this.total = Number(this.total) + Number(amount);
    }else{
      this.total = Number(this.total) - Number(amount);
    }
    console.log(this.total)
  }
}