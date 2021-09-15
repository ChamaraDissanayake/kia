import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import showroomslist from './../../assets/showroom.json';
import showroomdetails from './../../assets/showroomdetails.json';
import { KiaProviderService } from '../kia-provider.service';


@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.page.html',
  styleUrls: ['./showroom.page.scss'],
})
export class ShowRoomPage implements OnInit {
  showrooms = showroomslist;
  showroomDetails = showroomdetails;
  showroomId: string;
  showroomName: string;
  showroomAddress: string;
  showRoomOpenHours: string;
  isValid: boolean = false;

  constructor(private router: Router,
    // private platform: Platform,
    public kiaProviderService: KiaProviderService,
    public http: HttpClient,
    ) { }

  ngOnInit() {
    // this.platform.ready().then(()=>{
    //   this.showroom.forEach(element => {
    //     element.shop_name
    //   })
    // })
  }

  selectShowroom(event){
    console.log(event.target.value);
    this.sendShowroomId(event.target.value);

  }

  // sendShowroomId(showroomid: any) {
  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //   options: any = {
  //     // "ID": this.exchangeData.userDetails.ID, "MSISDN": arrangedMobile, "Categories": this.editsignup.value.category, "Language": this.editsignup.value.language, "BusinessName": this.editsignup.value.shopName,
  //     // "City": this.editsignup.value.city, "Type": "Free", "GPS": "6.8923865,79.8717421", "OccupantCount": this.editsignup.value.occupant, "CreatedDate": Date.now()
  //     "shop_id":showroomid
  //   },
  //   url: any = "http//";

  //   this.http.post(url, JSON.stringify(options), headers)
  //     .subscribe((data: any) => {
  //       console.log(`Congratulations data was successfully added `, data);
  //       this.showroomId=data.id;
  //       this.showroomName=data.showroom_name;
  //       this.showroomAddress=data.showroom_address;
  //       this.showRoomOpenHours=data.showroom_open_hours;
  //     },
  //     (error: any) => {
  //       console.log('Something went wrong!', error);
  //     });
  // }

  sendShowroomId(showroomid: any) {
    this.showroomId = showroomid;
    // this.showroomId=this.showroomDetails.shop_id.toString();
    setTimeout(() => {
      this.showroomName=this.showroomDetails.shop_name;
      this.showroomAddress=this.showroomDetails.shop_address;
      this.showRoomOpenHours=this.showroomDetails.shop_openTime + " to " + this.showroomDetails.shop_closeTime;
      this.isValid = true;
    }, 1000);
  }


  gotoCalendar(){
    this.kiaProviderService.showroom_id=this.showroomId;
    this.router.navigateByUrl("/calendar");
  }
}
