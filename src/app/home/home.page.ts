import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import sliderAll from '../../assets/SliderAll.json';
import sliderSUV from '../../assets/SliderSUV.json';
import sliderCar from '../../assets/SliderCar.json';
import sliderCommercial from '../../assets/SliderCommercial.json';
import { KiaProviderService } from '../kia-provider.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  btnEnabled = false;
  sliderChange: boolean = false;
  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private menu: MenuController) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.menu.swipeGesture(true);
    this.resetValues();
  }

  ionViewWillLeave(){
    this.menu.swipeGesture(false);
  }
  kiaSlider = sliderAll;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
    loop: true
  };

  gotoTestDrive() {
    this.kiaProviderService.booking_type = 1;
    this.router.navigateByUrl("/showroom");
  }
  gotoSelectedVehicle() {
    this.router.navigateByUrl("/selected-veicle");
  }

  clicked(num: any) {
    console.log("Clicked: " + num);
  }

  gotoServices(num: string) {
    switch (num) {
      case "0":
        this.kiaProviderService.areaOneExpanded = true;
        break;
      case "1":
        this.kiaProviderService.areaTwoExpanded = true;
        break;
      case "2":
        this.kiaProviderService.areaThreeExpanded = true;
        break;
      case "3":
        this.kiaProviderService.areaFourExpanded = true;
        break;

      default:
        this.kiaProviderService.areaOneExpanded = true;
        break;
    }
    this.router.navigateByUrl("/services");
  }

  gotoRegisterdServices(num: number){
    this.kiaProviderService.booking_type = num;
    this.router.navigateByUrl("/service-center");  
  }

  gotoShowroom(){
    this.kiaProviderService.booking_type = 1;
    this.router.navigateByUrl("/showroom");  
  }

  changeSlider(event) {
    this.sliderChange = !this.sliderChange;
    switch (event.target.value) {
      case "option1":
        this.kiaSlider = sliderSUV;
        break;

      case "option2":
        this.kiaSlider = sliderCar;;
        break;

      case "option3":
        this.kiaSlider = sliderCommercial;;
        break;

      default:
        this.kiaSlider = sliderAll;;
    }
  }

  resetValues(){
    this.kiaProviderService.showroom_id = '';
    this.kiaProviderService.vehicle_id = ''; 
    this.kiaProviderService.supervisor_id = '';
    this.kiaProviderService.supervisor_name = '';
    this.kiaProviderService.customer_name = '';
    this.kiaProviderService.customer_phone = '';
    this.kiaProviderService.customer_email = '';
    this.kiaProviderService.booking_type = 1;
    this.kiaProviderService.bookig_setting_id = '';
    this.kiaProviderService.date = '';
    this.kiaProviderService.time_slot = '';
    this.kiaProviderService.start_time = 0;
    this.kiaProviderService.end_time = 0;
    this.kiaProviderService.is_inquiry = false;
  }
}
