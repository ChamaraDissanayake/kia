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
  indexes: any = [];
  payList: any = [];
  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient) { }

  ngOnInit() {
    this.bills = payList;
  }

  selectInvoce(event){
    let isChecked = event.checked;
    let refNo = event.value.substring(0,event.value.indexOf(","));
    let amount: number = event.value.substring(event.value.indexOf(",")+1, event.value.indexOf("+"));
    let index: number = event.value.substring(event.value.indexOf("+")+1, event.value.length);
    if(isChecked){
      this.total = Number(this.total) + Number(amount);
      this.indexes.push(index)
    }else{
      this.total = Number(this.total) - Number(amount);
      this.indexes.splice(this.indexes.indexOf(index),1)
    }
    console.log(this.indexes)
  }

  pay(){
    this.payList=[];
    this.indexes.forEach(element => {
      this.payList.push(this.bills[element]);
    });
    console.log(this.payList)
  }
}