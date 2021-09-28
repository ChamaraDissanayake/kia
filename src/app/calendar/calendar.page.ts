import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar'
import { KiaProviderService } from '../kia-provider.service';
// import CalendarEvents from '../../assets/calendarEvents.json'
import myProfile from '../../assets/myProfile.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  profile = myProfile.my_vehicles;
  eventSource = [];
  viewTitle: string;
  selectedDay: any;
  isSlotBooked: boolean = false;
  eventCount = 0;
  // calendarEvents = CalendarEvents;
  calendarEvents;
  timeSlots
  isDisabled = true;
  bookedSlots;
  firstView: boolean = true;
  makeInquiry: boolean = true;
  vehicleSelected: boolean = true;
  stt:number = 0;
  ett:number = 0;
  calendar = {
    mode: 'month',
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
    private router: Router) { }

  ngOnInit() {
    console.log("calendar", this.kiaProviderService.showroom_id, this.kiaProviderService.booking_type)
    this.platform.ready().then(()=>{
      this.fillCalendar();
    })
  
    this.selectedDay = new Date();

    if(this.kiaProviderService.booking_type==1){
      this.vehicleSelected = true;
    }else{
      this.vehicleSelected = false;
    }
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
      console.log(`Congratulations calendar data was `, data);
      this.calendarEvents = data;
      let checked:boolean = true;
      this.calendarEvents.forEach(calEvents =>{
        if(checked){
          checked=false;
          this.timeSlots=calEvents.slots;
        }
      })
      this.bookedSlots = this.timeSlots;
      this.LoadEvents();
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    }); 
  }

  ionViewDidEnter(){
    this.fillCalendar();
  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  // Selected date renge and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  selectVehicle(vehicleId){
    this.vehicleSelected = true;
    this.kiaProviderService.vehicle_id=vehicleId;
    this.checkValidity();
  }

  selectTimeSlot(event) {
    let key = event.target.value;

    let st = key.substring(0,key.indexOf(','));
    let et = key.substring(key.indexOf(',')+1,key.indexOf('-'));

    let sth = (st.substring(0, key.indexOf(':'))*60).toString();
    let stm = (st.substring(key.indexOf(':')+1, st.length)).toString();
    this.stt = parseInt(sth) + parseInt(stm)-330;

    let eth = (et.substring(0, key.indexOf(':'))*60).toString();
    let etm = (et.substring(key.indexOf(':')+1, et.length)).toString();
    this.ett = parseInt(eth) + parseInt(etm)-330;

    let stat = key.substring(key.indexOf('-')+1,key.indexOf('+'))

    this.kiaProviderService.time_slot = key.substring(key.indexOf('+')+1,key.length)
    
    // console.log(this.kiaProviderService.time_slot)
    if(stat=="booked"){
      this.isSlotBooked = true;
    }else{
      this.isSlotBooked = false;
    }
    
    this.checkValidity();
    // this.selectedSlot = event.target.value;
  }

  gotoNextPage() {
    if(this.isSlotBooked || !this.isAvailableDay){
      this.kiaProviderService.is_inquiry = true;
    }else{
      this.kiaProviderService.is_inquiry = false;
    }
    this.kiaProviderService.date = this.selectedDay;
    this.kiaProviderService.start_time = this.stt;
    this.kiaProviderService.end_time = this.ett;

    if(this.kiaProviderService.booking_type==1){
      this.router.navigateByUrl("/test-drive-registration");
    }else{
      this.router.navigateByUrl("/booking-confirmed");
    }
  }

  onCurrentDateChanged(event){
    this.isSlotBooked=false;
    this.isAvailableDay=true;
    this.firstView = !this.firstView;
    this.stt = 0;
    this.ett = 0;
    
    this.selectedDay = new Date(Date.UTC(event.getFullYear(), event.getMonth(), event.getDate(),0,0,0,0));

    // var current = new Date(Date.UTC(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(),0,0,0,0));

    // if(((this.selectedDay.valueOf()-current.valueOf())/86400000)<4){
    //   this.isRecentDay = true;
    // } else {
    //   this.isRecentDay = false;
    // }

    this.calendarEvents.forEach(calEvents =>{
      calEvents.slots.forEach(slotList => {
        slotList.status='';
      });
    })

    this.calendarEvents.forEach(calEvents =>{
      if(calEvents.year==event.getFullYear() && calEvents.month==event.getMonth() && calEvents.day==event.getDate()){
        if(!calEvents.isAvailable){
          this.isAvailableDay=false;
        }else{
          this.isAvailableDay=true;
        }
        calEvents.slots.forEach(slotList => {
          if(!slotList.isSlotAvailable){
            slotList.status='booked';
          }else{
            slotList.status='';
          }
        });
        this.bookedSlots = calEvents.slots;
      }
    })

    // if(this.eventCount>0){
    //   this.calendarEvents.forEach(calEvents =>{
    //     if(calEvents.year==event.getFullYear() && calEvents.month==event.getMonth() && calEvents.day==event.getDate()){
    //       this.bookedSlots[calEvents.slot-1]["status"]="booked";
    //     }
    //   })
    // }
    this.checkValidity();
    console.log(this.isSlotBooked, !this.isAvailableDay)
  }

  // onEventSelected(event){
  //   console.log(event);
  // }
  LoadEvents(){
    // console.log(this.calendarEvents.length, this.calendarEvents)
    var events = [];
    var startTime;
    var endTime;
    this.calendarEvents.forEach(calEvents =>{

      if(!calEvents.isAvailable){
        startTime = new Date(Date.UTC(
          calEvents.year,
          calEvents.month,
          calEvents.day,
          0,
          510));
  
        endTime = new Date(Date.UTC(
          calEvents.year,
          calEvents.month,
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
    this.eventSource = events
  }

  // getCustomClass(events) {
  //   if(events.length > 0) {
  //     return events[0].eventType;
  //   }
  //   return '';
  // }
  // clickOnEvent(isFull, numberOfEvents){
  //   this.isSlotBooked = isFull;
  //   this.eventCount= numberOfEvents;
  // }

  // refresh() {
  //   this.zone.run(() => {
  //     console.log('force update the screen');
  //   });    
  // }
  checkBoxChanged(isChecked){
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
}