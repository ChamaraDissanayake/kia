import { Component, OnInit } from '@angular/core';
import myAllBookings from './../../assets/allBookings.json';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {
  allBookings = myAllBookings;
  constructor() { }

  ngOnInit() {
  }

}
