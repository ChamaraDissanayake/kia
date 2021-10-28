import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-after-sales',
  templateUrl: './after-sales.page.html',
  styleUrls: ['./after-sales.page.scss'],
})
export class AfterSalesPage implements OnInit {

  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService) { }

  ngOnInit() {
  }

  goToShowroom(){
    this.kiaProviderService.booking_type = 1;
    this.router.navigateByUrl("showroom");
  }

  gotoServices(num: any) {
    this.kiaProviderService.booking_type = num;
    this.router.navigateByUrl("/service-center");
  }

  gotoRequestPart() {
    this.router.navigateByUrl("/my-part-requests");
  }

  gotoAccessories() {
    this.router.navigateByUrl("/accessories");
  }

  gotoHome() {
    this.router.navigateByUrl("/home");
  }

  gotoShowroomList() {
    this.router.navigateByUrl("/showroom-list");
  }

  goToMyBookings() {
    this.router.navigateByUrl("/my-bookings");
  }

  gotoCallUs() {
    this.router.navigateByUrl("/call-us");
  }

  gotoDamageEstimate() {
    this.kiaProviderService.booking_type = 6;
    this.router.navigateByUrl("/damage-estimate");
  }

  gotoOnlinePayment() {
    this.router.navigateByUrl("/online-payment");
  }

  gotoPickAndDropBookings() {
    this.router.navigateByUrl("/pick-and-drop-bookings");
  }

  gotoPickAndDrop() {
    this.router.navigateByUrl("/pick-and-drop");
  }

  gotoContactUs(){
    this.router.navigateByUrl("/contact-us");
  }
}
