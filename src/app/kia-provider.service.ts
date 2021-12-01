import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";

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
  baseURL = 'http://web.kialanka.lk/api/';
  damage_estimate_id = 0;
  showcase_id = 0;
  request_part_id = 0;
  accessory_id = 0;
  public rated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateVehicle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public accepted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  pickMap = false;
  pickLatitude: number = 0;
  pickLongitude: number = 0; 
}
