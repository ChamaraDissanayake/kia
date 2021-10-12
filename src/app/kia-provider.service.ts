import { Injectable, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class KiaProviderService {
  // fromLogin: boolean = true;
  from: string = '';
  firstLoad: boolean = true;
  // areaOneExpanded: boolean = false;
  // areaTwoExpanded: boolean = false;
  // areaThreeExpanded: boolean = false;
  // areaFourExpanded: boolean = false;
  permissionLevel: number = 2;

  deviceId: string = '';
  user_id: string = '0';
  user_name: string = '';
  user_phone: string = '';
  user_email: string = '';
  showroom_id: string = '0';
  vehicle_id: string = '0';
  vehicle_number: string = ''
  supervisor_id: string = '0';
  supervisor_name: string = '';
  // customer_name: string = '';
  // customer_phone: string = '';
  // customer_email: string = '';
  booking_type: number = 1;
  booking_id: number = 0;
  booking_settings_id: string = '';
  date: string = '';
  time_slot: string = '';
  start_time: number = 0;
  end_time: number = 0;
  is_inquiry: string = '0';
  isDamageEstimatePending: boolean = true;
  baseURL = 'http://52.66.188.137/api/';
  damage_estimate_id = 0;

  showcase_id = 0;

  connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 3000);
  });

  disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    console.log('network was disconnected');
  });
  
  constructor(
    private network: Network,
    private platform: Platform) { }
}
