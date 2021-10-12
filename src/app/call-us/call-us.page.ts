import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.page.html',
  styleUrls: ['./call-us.page.scss'],
})
export class CallUsPage implements OnInit {
  public phoneNo:string ='';
  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
    this.phoneNo = '0765507975'
  }

  call(){
    this.callNumber.callNumber(this.phoneNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
