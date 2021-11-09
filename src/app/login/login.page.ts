import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Animation, AnimationController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { KiaProviderService } from '../kia-provider.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  ngOnInit() {
    setTimeout(async () => {
      await SplashScreen.hide();
      console.log("splash off now")
    }, 100);
  }

  ionViewDidEnter(){
    this.kiaProviderService.from = 'login';
    this.menu.swipeGesture(false);
    this.platform.ready().then(()=>{
      this.animationCtrl.create()
      .addElement(this.square.nativeElement)
      .duration(1000)
      .easing('ease-out')
      .delay(1000)
      // .fromTo('opacity', 0.1, 1)
      .fromTo('transform', 'translateY(500px)', 'translateY(120px)')
      .play();
    })
  }

  gotoHome(){
    this.router.navigateByUrl('/home');
    this.storage.set("isNewUser", false);
    this.platform.ready().then(()=>{
      this.animationCtrl.create()
      .addElement(this.square.nativeElement)
      .duration(1000)
      .easing('ease-out')
      .delay(1000)
      .fromTo('transform', 'translateY(120px)', 'translateY(500px)')
      .play();
    })
  }
}
