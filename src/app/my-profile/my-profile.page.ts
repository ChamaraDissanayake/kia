import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import myProfile from '../../assets/myProfile.json'
import { KiaProviderService } from '../kia-provider.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  profile = myProfile;
  constructor(    
    private platform: Platform,
    public alertController: AlertController,
    private router: Router,
    public kiaProviderService: KiaProviderService
    ) { }

  ngOnInit() {

  }

  // async presentAlertPrompt() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     subHeader: 'Chamara Dissanayake',
  //     inputs: [
  //       {
  //         name: 'name1',
  //         type: 'text',
  //         placeholder: 'Placeholder 1'
  //       },
  //       {
  //         name: 'name2',
  //         type: 'tel',
  //         placeholder: 'Placeholder 2'
  //       },
  //       {
  //         name: 'name6',
  //         type: 'number',
  //         min: 10,
  //         max: 10
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Update',
  //         role: 'submit',
  //         handler: () => {
  //           console.log('Confirm update');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  gotoEditProfile(){
    console.log('gotoEditProfile');
    this.router.navigateByUrl('/my-profile-edit');
  }

  gotoAddVehicle(vehicle: string){
    this.kiaProviderService.vehicle_id = vehicle;
    this.router.navigateByUrl('/vehicle-add');
  }
}
