import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
// import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  isDisabled:boolean = true;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private kiaProviderService: KiaProviderService
    // private storage: Storage
  ) { }

  ngOnInit() {
  }

  checkBoxController(){
    this.isDisabled = !this.isDisabled;
  }

  async agreed(){
    // this.storage.set("isAgredTandC", true);
    this.kiaProviderService.accepted.next(true);
    await this.modalController.dismiss();
  }

  goBack(){
    this.router.navigateByUrl("/pick-and-drop")
  }
}
