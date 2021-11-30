import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar'
import { KiaProviderService } from '../kia-provider.service';
// import CalendarEvents from '../../assets/calendarEvents.json'
// import myProfile from '../../assets/myProfile.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  myVehicles: any = [];
  //  = myProfile.my_vehicles;
  eventSource = [];
  viewTitle: string;
  selectedDay: any;
  isSlotBooked: boolean = false;
  eventCount = 0;
  calendarEvents:any=[];
  // timeSlots
  isDisabled = true;
  bookedSlots=[];
  firstView: boolean = true;
  firstLoad: boolean = true;
  makeInquiry: boolean = false;
  vehicleSelected: boolean = true;
  isHoliday: boolean = false;
  stt:number = 0;
  ett:number = 0;
  slotsAvailable:boolean = false;
  phoneNo:string ='011 750 8708';

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
    private alertController: AlertController,
    private callNumber: CallNumber) { }

  ngOnInit() {
    this.selectedDay = new Date();

    if(this.kiaProviderService.booking_type==1){
      this.vehicleSelected = true;
    }else{
      this.vehicleSelected = false;
      this.getMyVehicles();
    }
  }

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      if(this.kiaProviderService.booking_type==1){
        this.fillCalendarTD();
      }else{
        this.fillCalendar();
      }
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
  
  getMyVehicles() {
    console.log(this.kiaProviderService.user_id, "user id")
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'getMyVehicle';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("vehicle data new", data)
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

  fillCalendarTD() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "shop_id":this.kiaProviderService.showroom_id
      // "shop_id":9
    },
    url: any = this.kiaProviderService.baseURL + 'getDateForTestDrive';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("test drive data ", data)
      this.calendarEvents = data;
      this.LoadEvents();
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry4();
    }); 
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
    
    if((this.isSlotBooked || !this.isAvailableDay) && this.slotsAvailable){
      this.inquiryWarning();
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
    let monthFixed = this.selectedDay.getMonth()+1;
    this.kiaProviderService.date = this.selectedDay.getFullYear()+"-"+monthFixed+"-"+this.selectedDay.getDate();
    this.kiaProviderService.start_time = this.stt;
    this.kiaProviderService.end_time = this.ett;

    if(this.kiaProviderService.booking_type==1){
      this.router.navigateByUrl("/test-drive-registration");
    }else{
      this.sendServiceData();
    }
  }

  sendServiceData() {
    // console.log(
    // "deviceId",this.kiaProviderService.deviceId,
    // "user_id",this.kiaProviderService.user_id,
    // "vehicle_id",this.kiaProviderService.vehicle_id,
    // "showroom_id",this.kiaProviderService.showroom_id,
    // "supervisor_id",this.kiaProviderService.supervisor_id,
    // "booking_type",this.kiaProviderService.booking_type,
    // "booking_settings_id",this.kiaProviderService.booking_settings_id,
    // "date",this.kiaProviderService.date,
    // "time_slot",this.kiaProviderService.time_slot,
    // "start_time",this.kiaProviderService.start_time,
    // "end_time",this.kiaProviderService.end_time,
    // "is_inquiry",this.kiaProviderService.is_inquiry,
    // "phone_number",this.kiaProviderService.user_phone,
    // "supervisor_name",this.kiaProviderService.supervisor_name,
    // "customer_name",this.kiaProviderService.user_name,
    // "customer_email",this.kiaProviderService.user_email);
    
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
      console.log("submitted ",data,this.kiaProviderService.is_inquiry)
      if(this.kiaProviderService.is_inquiry == '1'){
        this.router.navigateByUrl("/booking-success-inquiry");
      }else{
        this.router.navigateByUrl("/booking-confirmed");
      }      
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry3();
    }); 
  }

  onCurrentDateChanged(event){
    this.isHoliday = false;
    if(this.kiaProviderService.booking_type==1){
      this.calendarEvents.forEach(calEvents =>{
        if(calEvents.year==event.getFullYear() && calEvents.month==event.getMonth()+1 && calEvents.day==event.getDate()){          
          let date = calEvents.day+'/'+calEvents.month+'/'+calEvents.year;
          console.log("calEvents", calEvents)
          if(calEvents.isHoliyday){
            this.isHoliday = true;
            this.holiday(date);
            console.log("Holiday ", date);
          }else{
            if(!calEvents.isAvailable){
              this.isAvailableDay=false;
              console.log("isAvailableDay",this.isAvailableDay, event)              
              // this.notAvailableDateTD(date);
            }else{
              this.isAvailableDay=true;
              console.log("isAvailableDay",this.isAvailableDay)
            }
          }
        }
      })
    }
    this.isSlotBooked=false;
    // this.isAvailableDay=true;
    this.firstView = !this.firstView;
    this.stt = 0;
    this.ett = 0;
    
    this.selectedDay = new Date(Date.UTC(event.getFullYear(), event.getMonth(), event.getDate(),0,0,0,0));
    if(!this.firstLoad && this.kiaProviderService.booking_type!=1){
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
        let date = calEvents.day+'/'+calEvents.month+'/'+calEvents.year;
        if(calEvents.isHoliyday){
          this.isHoliday = true;
          this.holiday(date);
          console.log("Holiday ", date);
        }else{
          if(!calEvents.isAvailable){
            this.isAvailableDay=false;
            console.log("isAvailableDay",this.isAvailableDay)
          }else{
            this.isAvailableDay=true;
            console.log("isAvailableDay",this.isAvailableDay)
          }
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
          // let date = calEvents.day+'/'+calEvents.month+'/'+calEvents.year;
          // this.notAvailableDate(date)
        }else{
          this.slotsAvailable=true;
        }
        console.log( "booked slots",this.bookedSlots.length)
      }
    })
  }

  LoadEvents(){
    console.log("Load events")
    var events = [];
    var startTime;
    var endTime;
    this.calendarEvents.forEach(calEvents =>{

      if(!calEvents.isAvailable || calEvents.isHoliyday){
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
    if(this.kiaProviderService.booking_type!=1){
      this.LoadBookings(new Date());
    }
    this.getContactNumber();
  }

  getContactNumber() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "dealer_id":this.kiaProviderService.showroom_id,
      "type":this.kiaProviderService.booking_type
    },
    url: any = this.kiaProviderService.baseURL + 'getDealerServicePhoneNumber';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("Contact data", data)
      this.phoneNo = data.phone_number;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry5();
    }); 
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
    } else if(this.kiaProviderService.booking_type==1 && this.isAvailableDay){
      this.isDisabled = false;
    }
    else{
      this.isDisabled = true;
    }
  }

  call(){
    this.callNumber.callNumber(this.phoneNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
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

  async Retry4() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.fillCalendarTD();            
          }
        }
      ]
    });
    await alert.present();
  }

  async Retry5() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getContactNumber();            
          }
        }
      ]
    });
    await alert.present();
  }

  async inquiryWarning() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'There are no available slots for the particular time. Please tick the inquiry checkbox to make an inquiry. Service agent will contact you to confirm your booking.',
      buttons: [{
          text: 'Accept',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  // async notAvailableDate(date) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert!',
  //     message: 'Service bookings are not available on '+date+'. Try different date.',
  //     buttons: [{
  //         text: 'Close',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // async notAvailableDateTD(date) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert!',
  //     message: 'Test drives are not available on '+date+'. Try different date.',
  //     buttons: [{
  //         text: 'Close',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  async holiday(date) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Sorry we are closed on '+date+'. Please try a different date.',
      buttons: [{
          text: 'Close',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
}