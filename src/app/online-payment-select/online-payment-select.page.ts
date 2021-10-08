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

  bills: any = [];
  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient) { }

  ngOnInit() {
    this.bills = payList;
  }

}