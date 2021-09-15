import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { ModalController, Platform } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar'
// import { from } from 'rxjs';
import { KiaProviderService } from '../kia-provider.service';
import CalendarEvents from '../../assets/calendarEvents.json'
import { DatePipe } from '@angular/common';
import myProfile from '../../assets/myProfile.json'

// import { CalModalPage } from '../pages/cal-modal/cal-modal.page';


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
  // dateDifference: number;
  // selectedSlot: any = 510;
  isSlotBooked: boolean = false;
  eventCount = 0;
  calendarEvents = CalendarEvents[0];
  timeSlots =  CalendarEvents[1];
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
    // private modalCtrl: ModalController,
    // private platform: Platform,
    // private zone: NgZone,
    private router: Router) { }

  ngOnInit() {
    this.selectedDay = new Date();
    this.bookedSlots = this.timeSlots;

    if(this.kiaProviderService.booking_type==1){
      this.vehicleSelected = true;
    }else{
      this.vehicleSelected = false;
    }
  }

  ionViewDidEnter(){
    this.LoadEvents();
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
    // this.addEvent();
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

  // createRandomEvents() {
  //   var events = [];
  //   for (var i = 0; i < 10; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: 'All Day - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true,
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: 'Event - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false,
  //       });
  //     }
  //   }
  //   this.eventSource = events;
  //   console.log(events);
  // }


  // addEvent() {
  //   var events = [];
  //   var startTime;
  //   var endTime;

  //   startTime = new Date(
  //     this.selectedDay.getFullYear(),
  //     this.selectedDay.getMonth(),
  //     this.selectedDay.getDate(),
  //     0,
  //     this.selectedDay.getMinutes()+this.stt
  //   );
  //   endTime = new Date(
  //     this.selectedDay.getFullYear(),
  //     this.selectedDay.getMonth(),
  //     this.selectedDay.getDate(),
  //     0,
  //     this.selectedDay.getMinutes()+this.ett
  //   );
  //   events.push({
  //     title: 'Book',
  //     startTime: startTime,
  //     endTime: endTime,
  //     allDay: false,
  //   });

  //   this.eventSource = events
  // }

  onCurrentDateChanged(event){
    console.log('onCurrentDateChanged',event);
    this.firstView = !this.firstView;
    this.stt = 0;
    this.ett = 0;
    
    this.selectedDay = new Date(Date.UTC(event.getFullYear(), event.getMonth(), event.getDate(),0,0,0,0));

    var current = new Date(Date.UTC(new Date().getFullYear(),new Date().getMonth(), new Date().getDate(),0,0,0,0));

    if(((this.selectedDay.valueOf()-current.valueOf())/86400000)<4){
      this.isAvailableDay = false;
    } else {
      this.isAvailableDay = true;
    }

    this.calendarEvents.forEach(calEvents =>{
      this.bookedSlots[calEvents.slot-1]["status"]="";
    })

    if(this.eventCount>0){
      this.calendarEvents.forEach(calEvents =>{
        if(calEvents.year==event.getFullYear() && calEvents.month==event.getMonth() && calEvents.day==event.getDate()){
          this.bookedSlots[calEvents.slot-1]["status"]="booked";
        }
      })
    }
    this.checkValidity();
  }

  onEventSelected(event){
    console.log(event);
  }
  LoadEvents(){
    // console.log(this.calendarEvents.length, this.calendarEvents)
    var events = [];
    var startTime;
    var endTime;
    this.calendarEvents.forEach(calEvents =>{
      // var startMinute = 510;
      // switch (calEvents.slot){
      //   case "1":
      //     startMinute = 510;
      //     break;
  
      //   case"2":
      //     startMinute = 660;
      //     break;
  
      //   case"3":
      //     startMinute = 840;
      //     break;
  
      //   default:
      //     startMinute = 510;
      // }

      startTime = new Date(Date.UTC(
        calEvents.year,
        calEvents.month,
        calEvents.day,
        0,
        calEvents.start));

      endTime = new Date(Date.UTC(
        calEvents.year,
        calEvents.month,
        calEvents.day,
        0,
        calEvents.end));

      events.push({
        title: 'Booked',
        startTime: startTime,
        endTime: endTime,
        allDay: false,
      });
    })
    this.eventSource = events
  }

  // getCustomClass(events) {
  //   if(events.length > 0) {
  //     return events[0].eventType;
  //   }
  //   return '';
  // }
  clickOnEvent(isFull, numberOfEvents){
    this.isSlotBooked = isFull;
    this.eventCount= numberOfEvents;
  }

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