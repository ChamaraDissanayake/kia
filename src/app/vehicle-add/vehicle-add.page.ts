import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.page.html',
  styleUrls: ['./vehicle-add.page.scss'],
})
export class VehicleAddPage implements OnInit {
  @ViewChild('vehicleAddFirst') vehicleAddFirst
  @ViewChild('vehicleAddLast') vehicleAddLast

  public signup : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private alertController: AlertController,
    private http: HttpClient,
    private storage: Storage) {
    this.signup = this.formBuilder.group({ 
      vehicleNumberFirst: [
        this.kiaProviderService.vehicle_number.substring(0,this.kiaProviderService.vehicle_number.indexOf(' ')),
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z]{2,}')
        ]
      ],
      vehicleNumberLast: [
        this.kiaProviderService.vehicle_number.substring(this.kiaProviderService.vehicle_number.indexOf(' ')+1,this.kiaProviderService.vehicle_number.length),
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });
  }

  ngOnInit() {
    // this.platform.ready().then(()=>{
    //   console.log(this.kiaProviderService.vehicle_id)
    //   if(this.kiaProviderService.vehicle_id!='0'){
    //     this.vehicle.value = this.kiaProviderService.vehicle_id;
    //   }
    // });
    console.log(this.kiaProviderService.vehicle_number, 'index of space')
  }

  validation_messages = {
    'vehicleNumberFirst': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'minlength', message: '* Vehicle number includes at least 2 charactors!' }
    ],
    'vehicleNumberLast': [
      { type: 'required', message: '* Vehicle number is required!' },
      { type: 'minlength', message: '* Vehicle number includes 4 numbers!' }
    ]
  };

  addNumber(){
    let numberPlate = this.vehicleAddFirst.value.toUpperCase()+" "+this.vehicleAddLast.value;
    console.log(numberPlate);
    this.kiaProviderService.vehicle_id="";
    this.kiaProviderService.vehicle_number=numberPlate;
    this.AddVehicle();
  }

  updateNumber(){
    let numberPlate = this.vehicleAddFirst.value.toUpperCase()+" "+this.vehicleAddLast.value;
    this.kiaProviderService.vehicle_number=numberPlate;
    this.AddVehicle();
  }

  AddVehicle() {
    console.log(
      this.kiaProviderService.user_id,
      this.kiaProviderService.vehicle_id,
      this.kiaProviderService.vehicle_number)
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id,
      "vehicle_id":this.kiaProviderService.vehicle_id,
      "vehicle_number":this.kiaProviderService.vehicle_number
    },
    url: any = this.kiaProviderService.baseURL + 'addNewVehicle';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("profile data ", data);
      this.checkNewVehicles(data.vehicle_id);
      // this.router.navigateByUrl('/my-profile');
      if(this.kiaProviderService.vehicle_id==""){
        this.addVehicleMessage("Your vehicle added successfully. Once our service advisor validate and approve your vehicle, you can access all our aftersales services.");
      }else{
        this.addVehicleMessage("Your vehicle updated successfully. Once our service advisor validate and approve your vehicle, you can access all our aftersales services.");
      }
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry();
    }); 
  }

  async checkNewVehicles(id){
    let newVehicleArray:any = [];
    let check = await this.storage.get("newVehicle");
    if(check){
      newVehicleArray = await this.storage.get("newVehicle");
      newVehicleArray.forEach(element => {
        if(id==element){
          newVehicleArray.splice(newVehicleArray.indexOf(element),1);
          console.log("Already exist")
        }
      });
      newVehicleArray.push(id);
    }else{
      this.storage.set("newVehicle", newVehicleArray);
      newVehicleArray[0]=id;
    }
    console.log("newVehicleArrayBefore",newVehicleArray);

    this.storage.set("newVehicle", newVehicleArray);
    // this.storage.remove("newVehicle")
    
    // setTimeout(async() => {
    //   newVehicleArray = await this.storage.get("newVehicle").then(()=>{
    //     console.log("newVehicleArrayAfter",newVehicleArray);  
    //   });
    // }, 1000);
  }

  async Retry() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.AddVehicle();
          }
        }
      ]
    });
    await alert.present();
  }

  async addVehicleMessage(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      backdropDismiss: false,
      message: message,
      buttons: [{
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('/my-profile');
          }
        }
      ]
    });
    await alert.present();
  }

  controllerFirst(){
    if(this.vehicleAddFirst.value.length>2){
      console.log(this.vehicleAddFirst.value.length);
      this.vehicleAddLast.setFocus();
    }
  }
  
  controllerLast(){
    if(this.vehicleAddLast.value.length==0){
      console.log(this.vehicleAddFirst.value.length);
      this.vehicleAddFirst.setFocus();
    }
  }
}
