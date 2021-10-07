import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { KiaProviderService } from '../kia-provider.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('square', {static: false}) square:ElementRef;
  // @ViewChild('image', {static: false}) image:ElementRef;

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    public kiaProviderService: KiaProviderService,
    private menu: MenuController,
    private platform: Platform,
    private storage: Storage
    ) {}

  ngAfterViewInit() {
    // setTimeout(() => {
    // }, 5000);
    this.platform.ready().then(()=>{
      this.animationCtrl.create()
      .addElement(this.square.nativeElement)
      .duration(1000)
      .easing('ease-out')
      .delay(2000)
      // .fromTo('opacity', 0.1, 1)
      .fromTo('transform', 'translateY(450px)', 'translateY(120px)')
      .play();
    })

    


    // this.animationCtrl.create()
    // .addElement(this.image.nativeElement)
    // .duration(1000)
    // .easing('ease-out')
    // // .fromTo('opacity', 0.1, 1)
    // .fromTo('transform', 'scaleY(1)', 'scaleY(0.3)')
    // .delay(3000)
    // .play();
    // console.log("ngAfterViewInit");
  }

  ngOnInit() {
    this.kiaProviderService.from = 'login';
  }

  ionViewDidEnter(){
    this.menu.swipeGesture(false);
  }

  gotoHome(){
    this.router.navigateByUrl('/home');
    this.storage.set("isNewUser", false);
  }
}
