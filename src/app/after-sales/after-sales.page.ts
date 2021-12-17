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

  gotoAccessories() {
    this.router.navigateByUrl("/accessories");
  }

  gotoShowroomList() {
    this.router.navigateByUrl("/showroom-list");
  }

  gotoCallUs() {
    this.router.navigateByUrl("/call-us");
  }

  gotoOnlinePayment() {
    this.router.navigateByUrl("/online-payment");
  }

  gotoPickAndDrop() {
    this.router.navigateByUrl("/pick-and-drop");
  }

  gotoContactUs(){
    this.router.navigateByUrl("/contact-us");
  }
}
