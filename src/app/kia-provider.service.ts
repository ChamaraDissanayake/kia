import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KiaProviderService {

  constructor() { }

  // fromLogin: boolean = true;
  from: string = '';
  isFirstLoadService: boolean = true;
  areaOneExpanded: boolean = false;
  areaTwoExpanded: boolean = false;
  areaThreeExpanded: boolean = false;
  areaFourExpanded: boolean = false;
  permissionLevel: number = 2;

  deviceId: string = '';
  user_id: string = '';
  user_name: string = '';
  user_phone: string = '';
  user_email: string = '';
  showroom_id: string = '';
  vehicle_id: string = '';
  supervisor_id: string = '';
  supervisor_name: string = '';
  customer_name: string = '';
  customer_phone: string = '';
  customer_email: string = '';
  booking_type: number = 1;
  bookig_setting_id: string = '';
  date: string = '';
  time_slot: string = '';
  start_time: number = 0;
  end_time: number = 0;
  is_inquiry: boolean = false;
}
