import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import showroomslist from './../../assets/showroom.json';
import showroomdetails from './../../assets/showroomdetails.json';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-service-center',
  templateUrl: './service-center.page.html',
  styleUrls: ['./service-center.page.scss'],
})
export class ServiceCenterPage implements OnInit {
  serviceCenters = showroomslist; //Need service centers list
  serviceCenterDetails = showroomdetails; //Need service center details
  supervisors = showroomdetails.supervisors;
  showroomId: string = '';
  showroomName: string;
  showroomAddress: string;
  showRoomOpenHours: string;
  isValid: boolean = false;

  constructor(private router: Router,
    public kiaProviderService: KiaProviderService,
    public http: HttpClient,
    ) { }

  ngOnInit() {
  }

  selectShowroom(event){
    console.log(event.target.value);
    this.sendShowroomId(event.target.value);
  }

  selectSupervisor(event){
    let key = event.target.value;
    this.kiaProviderService.supervisor_id = event.target.value.substring(0,key.indexOf(','));
    this.kiaProviderService.supervisor_name = event.target.value.substring(key.indexOf(',')+1, key.length);
    this.isValid = true;
    console.log(this.kiaProviderService.supervisor_id, this.kiaProviderService.supervisor_name);
  }

  gotoCalendar(){
    this.kiaProviderService.showroom_id=this.showroomId;
    this.router.navigateByUrl("/calendar");
  }

  sendShowroomId(showroomid: any) {
    this.showroomId = showroomid;
    setTimeout(() => {
      this.showroomId=this.serviceCenterDetails.shop_id;
      this.showroomName=this.serviceCenterDetails.shop_name;
      this.showroomAddress=this.serviceCenterDetails.shop_address;
      this.showRoomOpenHours=this.serviceCenterDetails.shop_openTime + " to " + this.serviceCenterDetails.shop_closeTime;
      if(this.serviceCenterDetails.supervisors.length>0){
        this.isValid = false;
      }else{
        this.isValid = true;
      }
    }, 1000);
  }
}
