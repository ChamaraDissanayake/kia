import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar'
import { KiaProviderService } from '../kia-provider.service';
// import CalendarEvents from '../../assets/calendarEvents.json'
// import myProfile from '../../assets/myProfile.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  myVehicles;
  //  = myProfile.my_vehicles;
  eventSource = [];
  viewTitle: string;
  selectedDay: any;
  isSlotBooked: boolean = false;
  eventCount = 0;
  calendarEvents;
  timeSlots
  isDisabled = true;
  bookedSlots=[];
  firstView: boolean = true;
  firstLoad: boolean = true;
  makeInquiry: boolean = true;
  vehicleSelected: boolean = true;
  stt:number = 0;
  ett:number = 0;
  slotsAvailable:boolean = false;

  public calendar = {
    currentDate: new Date(),
    startingDayMonth: 1
  };
  isAvailableDay: boolean = true;

  markDisabled = (date: Date) => {
    var current1 = new Date();
    var current = new Date(Date.UTC(current1.getFullYear(),current1.getMonth(), current1.getDate(),0,0,0,0))
    var range = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()+31))
    return range < date || date < current;
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private platform: Platform,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.selectedDay = new Date();

    if(this.kiaProviderService.booking_type==1){
      this.vehicleSelected = true;
    }else{
      this.vehicleSelected = false;
      this.getMyVehicles();
    }
  }
  
  getMyVehicles() {
    console.log(this.kiaProviderService.user_id, "user id")
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'myProfile';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("vehicle data ", data)
      this.myVehicles = data[0].vehicles;
      this.kiaProviderService.user_name = data[0].name;
      this.kiaProviderService.user_phone = data[0].phone_number;
      this.kiaProviderService.user_email = data[0].email;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry1();
    }); 
  }

  fillCalendar() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "shop_id":this.kiaProviderService.showroom_id,
			"booking_type":this.kiaProviderService.booking_type
    },
    url: any = this.kiaProviderService.baseURL + 'bookingSettings';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("calendar data ", data)
      this.calendarEvents = data;
      this.LoadEvents();
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry2();
    }); 
  }

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      this.fillCalendar();
    })
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  selectVehicle(event){
    let vehicleId = event.target.value;
    this.vehicleSelected = true;
    this.kiaProviderService.vehicle_id=vehicleId;
    this.checkValidity();
  }

  selectTimeSlot(event) {
    let key = event.target.value;
    console.log(key, "key")
    let st = key.substring(0,key.indexOf(','));
    let et = key.substring(key.indexOf(',')+1,key.indexOf('-'));

    let sth = (st.substring(0, key.indexOf(':'))*60).toString();
    let stm = (st.substring(key.indexOf(':')+1, st.length)).toString();
    this.stt = parseInt(sth) + parseInt(stm)-330;

    let eth = (et.substring(0, key.indexOf(':'))*60).toString();
    let etm = (et.substring(key.indexOf(':')+1, et.length)).toString();
    this.ett = parseInt(eth) + parseInt(etm)-330;

    let stat = key.substring(key.indexOf('-')+1,key.indexOf('+'));

    this.kiaProviderService.time_slot = key.substring(key.indexOf('+')+1,key.indexOf('~'))

    this.kiaProviderService.booking_settings_id = key.substring(key.indexOf('~')+1,key.length);

    
    if(stat=="booked"){
      this.isSlotBooked = true;
    }else{
      this.isSlotBooked = false;
    }
    
    this.checkValidity();
  }

  gotoNextPage() {
    console.log("time_slot ", this.kiaProviderService.time_slot, this.kiaProviderService.booking_settings_id)
    if(this.isSlotBooked || !this.isAvailableDay){
      this.kiaProviderService.is_inquiry = '1';
    }else{
      this.kiaProviderService.is_inquiry = '0';
    }
    this.kiaProviderService.date = this.selectedDay.getFullYear()+"-"+this.selectedDay.getMonth()+"-"+this.selectedDay.getDate();
    this.kiaProviderService.start_time = this.stt;
    this.kiaProviderService.end_time = this.ett;

    if(this.kiaProviderService.booking_type==1){
      this.router.navigateByUrl("/test-drive-registration");
    }else{
      this.sendServiceData();
    }
  }

  sendServiceData() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "deviceId":this.kiaProviderService.deviceId,
      "user_id":this.kiaProviderService.user_id,
      "vehicle_id":this.kiaProviderService.vehicle_id,
      "showroom_id":this.kiaProviderService.showroom_id,
      "supervisor_id":this.kiaProviderService.supervisor_id,
      "booking_type":this.kiaProviderService.booking_type,
      "booking_settings_id":this.kiaProviderService.booking_settings_id,
      "date":this.kiaProviderService.date,
      "time_slot":this.kiaProviderService.time_slot,
      "start_time":this.kiaProviderService.start_time,
      "end_time":this.kiaProviderService.end_time,
      "is_inquiry":this.kiaProviderService.is_inquiry,
      "phone_number":this.kiaProviderService.user_phone,
      "supervisor_name":this.kiaProviderService.supervisor_name,
      "customer_name":this.kiaProviderService.user_name,
      "customer_email":this.kiaProviderService.user_email
      },
    url: any = this.kiaProviderService.baseURL + 'addBooking';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("submitted ",data)
      this.router.navigateByUrl("/booking-confirmed");
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry3();
    }); 
  }

  onCurrentDateChanged(event){
    this.isSlotBooked=false;
    // this.isAvailableDay=true;
    this.firstView = !this.firstView;
    this.stt = 0;
    this.ett = 0;
    
    this.selectedDay = new Date(Date.UTC(event.getFullYear(), event.getMonth()+1, event.getDate(),0,0,0,0));

    if(!this.firstLoad){
      this.LoadBookings(event);
    }
    this.firstLoad=false;
    this.checkValidity();
    console.log(this.isSlotBooked, !this.isAvailableDay)
  }

  LoadBookings(event){
    this.calendarEvents.forEach(calEvents =>{
      calEvents.slots.forEach(slotList => {
        slotList.status='';
      });
    })

    this.calendarEvents.forEach(calEvents =>{
      if(calEvents.year==event.getFullYear() && calEvents.month==event.getMonth()+1 && calEvents.day==event.getDate()){
        if(!calEvents.isAvailable){
          this.isAvailableDay=false;
          console.log("isAvailableDay",this.isAvailableDay)
        }else{
          this.isAvailableDay=true;
          console.log("isAvailableDay",this.isAvailableDay)
        }
        calEvents.slots.forEach(slotList => {
          if(!slotList.isSlotAvailable){
            slotList.status='booked';
          }else{
            slotList.status='';
          }
        });
        this.bookedSlots = calEvents.slots;
        
        if(this.bookedSlots.length==0){
          this.slotsAvailable=false;
        }else{
          this.slotsAvailable=true;
        }
        console.log( "booked slots",this.bookedSlots.length)
      }
    })
  }

  LoadEvents(){
    var events = [];
    var startTime;
    var endTime;
    this.calendarEvents.forEach(calEvents =>{

      if(!calEvents.isAvailable){
        startTime = new Date(Date.UTC(
          calEvents.year,
          calEvents.month-1,
          calEvents.day,
          0,
          510));
  
        endTime = new Date(Date.UTC(
          calEvents.year,
          calEvents.month-1,
          calEvents.day,
          0,
          840));
  
        events.push({
          title: 'Booked',
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }

    })
    this.eventSource = events;
    this.LoadBookings(new Date());
  }

  checkBoxChanged(event){
    let isChecked = event.detail.checked
    this.makeInquiry=isChecked;
    this.checkValidity();
  }

  checkValidity(){
    if(this.stt!=0 && this.vehicleSelected){
      if(this.isAvailableDay || (!this.isAvailableDay && this.makeInquiry)){
        if(!this.isSlotBooked || (this.isSlotBooked && this.makeInquiry)){
          this.isDisabled = false;
        }else{
          this.isDisabled = true;
        }
      }else{
        this.isDisabled = true;
      }
    }else{
      this.isDisabled = true;
    }
  }

  async Retry1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getMyVehicles(); 
          }
        }
      ]
    });
    await alert.present();
  }

  async Retry2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.fillCalendar();            
          }
        }
      ]
    });
    await alert.present();
  }

  async Retry3() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.sendServiceData();
          }
        }
      ]
    });
    await alert.present();
  }
}