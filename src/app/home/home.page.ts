import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import sliderAll from '../../assets/SliderAll.json';
import sliderSUV from '../../assets/SliderSUV.json';
import sliderCar from '../../assets/SliderCar.json';
import sliderCommercial from '../../assets/SliderCommercial.json';
import { KiaProviderService } from '../kia-provider.service';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  btnEnabled = false;
  sliderChange: boolean = false;
  activeSlider: string = '';
  videoPaused = true;

  @ViewChild('player')videoPlayer;
  @ViewChild('playImage')videoPlayButton;

  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private menu: MenuController,
    private platform: Platform) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      this.playVideo();
    })
    this.menu.swipeGesture(true);
    this.resetValues();
  }

  ionViewWillLeave(){
    this.videoPlayer.nativeElement.pause();
    this.videoPaused=true;
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

  // clicked(num: any) {
  //   console.log("Clicked: " + num);
  // }

  // gotoServices(num: string) {
  //   switch (num) {
  //     case "0":
  //       this.kiaProviderService.areaOneExpanded = true;
  //       break;
  //     case "1":
  //       this.kiaProviderService.areaTwoExpanded = true;
  //       break;
  //     case "2":
  //       this.kiaProviderService.areaThreeExpanded = true;
  //       break;
  //     case "3":
  //       this.kiaProviderService.areaFourExpanded = true;
  //       break;

  //     default:
  //       this.kiaProviderService.areaOneExpanded = true;
  //       break;
  //   }
  //   this.router.navigateByUrl("/services");
  // }

  gotoRegisterdServices(num: number){
    this.kiaProviderService.booking_type = num;
    this.router.navigateByUrl("/service-center");  
  }

  gotoShowroom(){
    this.kiaProviderService.booking_type = 1;
    this.router.navigateByUrl("/showroom");  
  }

  changeSlider(option: string) {
    this.sliderChange = !this.sliderChange;
    switch (option) {
      case "option1":
        this.kiaSlider = sliderSUV;
        this.activeSlider = 'suv';
        break;

      case "option2":
        this.kiaSlider = sliderCar;
        this.activeSlider = 'car';
        break;

      case "option3":
        this.kiaSlider = sliderCommercial;
        this.activeSlider = 'lorry';
        break;

      default:
        this.kiaSlider = sliderAll;
        this.activeSlider = 'car';
    }
  }

  playVideo(){
    if(this.videoPaused){
      this.videoPlayer.nativeElement.play();
      this.videoPaused=!this.videoPaused;
    }else{
      this.videoPlayer.nativeElement.pause();
      this.videoPaused=!this.videoPaused;
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
