import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, Platform, ViewWillLeave } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
import VRImageGreen from './../../assets/VRImageGreen.json'
import VRImageWhite from './../../assets/VRImageWhite.json'

@Component({
  selector: 'app-selected-veicle',
  templateUrl: './selected-veicle.page.html',
  styleUrls: ['./selected-veicle.page.scss'],
})
export class SelectedVeiclePage implements OnInit, ViewWillLeave{
  videoPaused: boolean = true;
  videoId =0;
  changeSlider: boolean = false;
  vrImagesList:any = [];
  vrImages:any = [];
  //  = VRImageWhite;
  colorCode: string = '';
  colorName: string = '';
  vehicleColor="Clear white";
  feed: any = [];
  images: any = [];
  
  @ViewChildren('player')videoPlayers: QueryList<any>;
  @ViewChildren('playImage')videoPlayButton: QueryList<any>;
  @ViewChild('slides') slides: IonSlides;


  constructor(
    private router: Router,
    private platform: Platform,
    private http: HttpClient,
    public kiaProviderService: KiaProviderService) {}

  slideOpts = {
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
    },
    loop:true
  }

  ngOnInit() {
    this.LoadData();
    // this.LoadVR();
  }

  ionViewWillLeave() {
    this.videoPlayers.forEach(player =>{
      player.nativeElement.pause();
      this.videoId = 0;
    })
  }

  slidePrev() {
    this.slides.slidePrev();
  }

  slideNext() {
    this.slides.slideNext();
  }

  LoadData(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "showcase_id":this.kiaProviderService.showcase_id
    },
    url: any = this.kiaProviderService.baseURL + 'getShowCase';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("showcase data ", data)
      this.feed = data[0];
      this.images = data[1];
      this.vrImagesList = data[3];
      console.log(this.vrImagesList);
      this.colorCode = this.vrImagesList[0].colorCode;
      this.colorName = this.vrImagesList[0].colorName;
      this.LoadVR(this.colorCode);
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    }); 
  }

  LoadVR(colorCode){
    console.log("details", colorCode)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "showcase_id":this.kiaProviderService.showcase_id,
      "colorCode":colorCode
    },
    url: any = this.kiaProviderService.baseURL + 'getShowCaseByColor';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("vr data ", data)
      this.vrImages = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    }); 
  }

  playVideo(id){
    console.log("video id ",this.videoPlayButton.get(id).nativeElement.id);
    this.videoPlayers.forEach(player =>{
      player.nativeElement.pause();
    })
    if(this.videoPaused){
      this.videoPlayers.get(id).nativeElement.play();
      this.videoPaused=false;
      this.videoId = this.videoPlayButton.get(id).nativeElement.id;
    }else{
      this.videoPlayers.get(id).nativeElement.pause();
      this.videoPaused=true;
      this.videoId = 0;
    }
  }

  changeColor(button){
    this.changeSlider = !this.changeSlider;
    console.log("check color", this.colorCode, button.colorCode);
    if(this.colorCode == button.colorCode){
      console.log("same color", button.colorCode);
    }else{
      console.log("color changed", button.colorCode);
      this.colorName = button.colorName;
      this.colorCode = button.colorCode;
      this.LoadVR(button.colorCode);
    }
  }
}
