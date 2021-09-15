import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, QueryList, ViewChildren, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, Platform, ViewWillLeave } from '@ionic/angular';
import data from './../../assets/feed.json';
import VRImageGreen from './../../assets/VRImageGreen.json'
import VRImageWhite from './../../assets/VRImageWhite.json'

@Component({
  selector: 'app-selected-veicle',
  templateUrl: './selected-veicle.page.html',
  styleUrls: ['./selected-veicle.page.scss'],
})
export class SelectedVeiclePage implements OnInit, ViewWillLeave{

  videoPaused: boolean = true;
  videoId =100;
  changeSlider: boolean = false;

  @ViewChild('slides') slides: IonSlides;
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 0,
  //   loop:true,
  //   effect:'fade',
  //   noSwipingClass: 'swiper-no-swiping'
  // };


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

  vrImages = VRImageWhite;
  vehicleColor="Clear white"
  

  feed = data;
  @ViewChildren('player')videoPlayers: QueryList<any>;
  @ViewChildren('playImage')videoPlayButton: QueryList<any>;

  currentPlaying = null;
  constructor(private router: Router, private platform: Platform) {}

  // didScroll(){
  //   if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)){
  //     return;
  //   } else if(this.currentPlaying && !this.isElementInViewport(this.currentPlaying)){
  //     this.currentPlaying.pause();
  //     this.currentPlaying = null;
  //   }
  //   this.videoPlayers.forEach(player =>{
  //     console.log('player: ', player);

  //     if(this.currentPlaying){
  //       return;
  //     }

  //     const nativeElement = player.nativeElement;
  //     const inView = this.isElementInViewport(nativeElement);

  //     if(inView){
  //       this.currentPlaying = nativeElement;
  //       // this.currentPlaying.muted = true;
  //       console.log(this.currentPlaying);
  //       this.currentPlaying.play();
  //     }
  //   })
  // }

  playVideo(id){
    console.log("video id ",this.videoPlayButton.get(id).nativeElement.id);
    this.videoPlayers.forEach(player =>{
      player.nativeElement.pause();
    })
    if(this.videoPaused){
      this.videoPlayers.get(id).nativeElement.play();
      this.videoPaused=false;
      this.videoId = this.videoPlayButton.get(id).nativeElement.id;
      // console.log(this.videoPlayButton.get(id).nativeElement.id);
    }else{
      this.videoPlayers.get(id).nativeElement.pause();
      this.videoPaused=true;
      this.videoId = 100;
      // console.log(this.videoPlayButton.get(id).nativeElement.id);
    }
  }

  // playButton(id){
  //   console.log("button id " ,this.videoPlayButton.get(id).nativeElement.id, id);
  // }

  // isElementInViewport(el){
  //   const rect = el.getBoundingClientRect();
  //   return(
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight*3/5 || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // }

  ngOnInit() {
    // this.platform.ready().then(()=>{
    //   this.didScroll();
    // })
  }

  ionViewWillLeave() {
    this.videoPlayers.forEach(player =>{
      player.nativeElement.pause();
      this.videoId = 100;
    })
  }

  changeColor(color){
    this.changeSlider = !this.changeSlider;
    if(color==0){
      this.vrImages = VRImageWhite;
      this.vehicleColor = "Clear white";
    }else{
      this.vrImages = VRImageGreen;
      this.vehicleColor = "Uraban green"
    }
  }
}
