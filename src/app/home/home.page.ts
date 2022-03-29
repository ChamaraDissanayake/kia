import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
import { AlertController, MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SplashScreen } from '@capacitor/splash-screen';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

// TEST USER DETAILS:
// id: 557
// phone: 0798234935
// otp: 1234
export class HomePage implements OnInit {
  kiaSlider:any =[];
  sliderAll:any=[];
  sliderSUV:any=[];
  sliderCar:any=[];
  sliderCommercial:any=[];
  sliderPromotion:any=[];
  sliderChange: boolean = false;
  activeSlider: string = '';

  mainVideo:any=[];
  secondaryVideo:any=[];

  videoPaused1 = true;
  videoPaused2 = true;
  @ViewChild('loader')loader

  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private menu: MenuController,
    private http: HttpClient,
    private alertController: AlertController,
    private photoViewer: PhotoViewer,
    private geolocation: Geolocation,
    private storage: Storage
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      await SplashScreen.hide();
      console.log("splash off now");
      this.kiaProviderService.appFullyLoaded = true;
    }, 100);
    this.LoadData();
    this.getLocationPermission();
  }

  async getLocationPermission(){
    let hasLocationPermission = await this.storage.get("hasLocationPermission");
    console.log("hasLocationPermission",hasLocationPermission)
    if(hasLocationPermission){
      console.log("Has location permission");
    } else if(hasLocationPermission == false){
      console.log("Location permission denied");
    } else {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.storage.set("hasLocationPermission", true);
        console.log("geolocation", resp.coords.latitude, resp.coords.longitude);
      }).catch((error) => {
        console.log('Error getting location', error);
        if(error.code==1){
          this.storage.set("hasLocationPermission", false);
        }        
      });
    }

  }

  LoadData(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {

    },
    url: any = this.kiaProviderService.baseURL + 'ShowCaseForSliderV2';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("home data",data)
      this.sliderAll = data[0];
      this.sliderCar = data[1];
      this.sliderSUV = data[2];
      this.sliderCommercial = data[3];
      this.mainVideo = data[4];
      this.secondaryVideo = data[5];
      this.sliderPromotion = data[6];
      this.kiaSlider = this.sliderAll;
      this.sliderChange = !this.sliderChange;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry()
    }); 
  }

  
  ionViewDidEnter(){
    this.menu.swipeGesture(true);
    this.resetValues();
  }

  ionViewWillLeave(){
    this.menu.swipeGesture(false);
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  slideOptsPromo = {
    autoplay:true,
    speed: 2000,
    loop: true,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }

  gotoTestDrive() {
    this.kiaProviderService.booking_type = 1;
    this.router.navigateByUrl("/showroom");
  }
  gotoSelectedVehicle(showcaseID) {
    console.log("selected", showcaseID);
    this.kiaProviderService.showcase_id = showcaseID;
    this.router.navigateByUrl("/selected-veicle");
  }


  gotoRegisterdServices(num: number){
    if(this.kiaProviderService.permissionLevel==2){
      this.kiaProviderService.booking_type = num;
      this.router.navigateByUrl("/service-center");  
    }else{
      console.log("not verified user");
    }
  }

  gotoShowroom(){
    this.kiaProviderService.booking_type = 1;
    this.router.navigateByUrl("/showroom");  
  }

  changeSlider(option: string) {
    this.sliderChange = !this.sliderChange;
    switch (option) {
      case "option1":
        this.kiaSlider = this.sliderSUV;
        this.activeSlider = 'suv';
        break;

      case "option2":
        this.kiaSlider = this.sliderCar;
        this.activeSlider = 'car';
        break;

      case "option3":
        this.kiaSlider = this.sliderCommercial;
        this.activeSlider = 'lorry';
        break;

      default:
        this.kiaSlider = this.sliderAll;
        this.activeSlider = 'car';
    }
  }

  resetValues(){
    this.kiaProviderService.showroom_id = '';
    this.kiaProviderService.vehicle_id = '';
    this.kiaProviderService.vehicle_number = ''
    this.kiaProviderService.supervisor_id = '';
    this.kiaProviderService.supervisor_name = '';
    this.kiaProviderService.booking_type = 1;
    this.kiaProviderService.booking_id = 0;
    this.kiaProviderService.booking_settings_id = '';
    this.kiaProviderService.date = '';
    this.kiaProviderService.time_slot = '';
    this.kiaProviderService.start_time = 0;
    this.kiaProviderService.end_time = 0;
    this.kiaProviderService.is_inquiry = '0';
    this.kiaProviderService.damage_estimate_id = 0;
    this.kiaProviderService.showcase_id = 0;
    this.kiaProviderService.request_part_id = 0;
    this.kiaProviderService.accessory_id = 0;
    this.kiaProviderService.rated.next(false);
    this.kiaProviderService.updateVehicle.next(false);
    this.kiaProviderService.pickMap = false;    
    this.kiaProviderService.pickLatitude = 0;
    this.kiaProviderService.pickLongitude = 0;
  }

  async Retry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.LoadData();
          }
        }
      ]
    });
    await alert.present();
  }

  FullImage(image){
    this.photoViewer.show(image);
  }
}
