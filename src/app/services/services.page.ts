import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform, ViewDidEnter } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit, OnDestroy, ViewDidEnter {
  @ViewChild('fixFocus') fixFocus;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    public kiaProviderService: KiaProviderService,
    private platform: Platform) { }

  ionViewDidEnter(): void {
    this.platform.ready().then(()=>{
      this.content.scrollToPoint(0,this.fixFocus.nativeElement.offsetTop-68,1500);
    })
  }

  ngOnInit() {
    // setTimeout(() => {
      // this.fixFocus.setFocus();
      // scrollToPoint(0, 300, 1000)
    // var titleELe = document.getElementById(this.fixFocus);
    //   this.content.scrollToPoint(0,this.fixFocus.nativeElement.offsetTop-60,1500);
    // }, 150);
  }

  ngOnDestroy(){
    this.kiaProviderService.areaOneExpanded = false;
    this.kiaProviderService.areaTwoExpanded = false;
    this.kiaProviderService.areaThreeExpanded = false;
    this.kiaProviderService.areaFourExpanded = false;
  }
}
