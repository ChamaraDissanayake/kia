import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import sliderAll from '../../assets/SliderAll.json';
// import sliderSUV from '../../assets/SliderSUV.json';
// import sliderCar from '../../assets/SliderCar.json';
// import sliderCommercial from '../../assets/SliderCommercial.json';
import { KiaProviderService } from '../kia-provider.service';
import { AlertController, MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SplashScreen } from '@capacitor/splash-screen';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
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
  // @ViewChild('player1')videoPlayer1;
  // @ViewChild('player2')videoPlayer2;
  @ViewChild('loader')loader

  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private menu: MenuController,
    // private platform: Platform,
    private http: HttpClient,
    private alertController: AlertController,
    private photoViewer: PhotoViewer
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      await SplashScreen.hide();
      console.log("splash off now")
    }, 100);
    this.LoadData();
    // this.platform.ready().then(()=>{
    //   if(this.kiaProviderService.firstLoad){
    //     this.videoPlayer.nativeElement.muted = true;
    //     this.playVideo();
    //     this.kiaProviderService.firstLoad=false;
    //   }
    // })
    
  }

  LoadData(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {

    },
    url: any = this.kiaProviderService.baseURL + 'ShowCaseForSliderV2';
    // url: any = this.kiaProviderService.baseURL + 'ShowCaseForSlider';

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
      // this.presentToast();
      this.sliderChange = !this.sliderChange;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry()
    }); 
  }

  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Your settings have been saved.',
  //     duration: 2000
  //   });
  //   toast.present();
  // }
  
  ionViewDidEnter(){
    this.menu.swipeGesture(true);
    this.resetValues();
  }

  ionViewWillLeave(){
    // if(this.videoPlayer1){
    //   this.videoPlayer1.nativeElement.pause();
    // }
    // this.videoPlayer2.nativeElement.pause();
    // this.videoPaused1=true;
    // this.videoPaused2=true;
    this.menu.swipeGesture(false);
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  // slideOptsPromo = {
  //   initialSlide: 0,
  //   speed: 400,
  //   autoplay: true,
  //   loop: true
  // };

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

  // playVideo1(){
  //   if(this.videoPaused1){
  //     this.videoPlayer1.nativeElement.play();
  //     this.videoPlayer2.nativeElement.pause();
  //     this.videoPaused2=true;
  //     this.videoPaused1=!this.videoPaused1;
  //     // this.videoPlayer.nativeElement.muted = false;
  //   }else{
  //     this.videoPlayer1.nativeElement.pause();
  //     this.videoPaused1=!this.videoPaused1;
  //   }
  // }

  // playVideo2(){
  //   if(this.videoPaused2){
  //     this.videoPlayer2.nativeElement.play();
  //     console.log("video", this.videoPlayer1)
  //     if(this.videoPlayer1){
  //       this.videoPlayer1.nativeElement.pause();
  //       this.videoPaused1=true;
  //     }

  //     this.videoPaused2=!this.videoPaused2;
  //   }else{
  //     this.videoPlayer2.nativeElement.pause();
  //     this.videoPaused2=!this.videoPaused2;
  //   }
  // }

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
