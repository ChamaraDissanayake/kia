import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

@Component({
  selector: 'app-request-part',
  templateUrl: './request-part.page.html',
  styleUrls: ['./request-part.page.scss'],
})
export class RequestPartPage implements OnInit {

  public partRequestForm : FormGroup;
  image:string = '';
  finalImageURL:string = '';
  vehicleModels:any = [];
  showLoader:boolean = false;
  vehicle_model:string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private camera: Camera,
    public kiaProviderService: KiaProviderService,
    public transfer: FileTransfer,
    private alertController: AlertController,
    private http: HttpClient,
    private toastController: ToastController
    ) {
    this.partRequestForm = this.formBuilder.group({
      description:['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{9,}'), Validators.minLength(10)]],
    }); 
  }

  ngOnInit() {
    this.getVehicleModels();
  }

  validation_messages = {
    'description': [
      { type: 'required', message: '* Description required!' },
      { type: 'pattern', message: '* Description too short!' }
    ]
  };

  selectImage() {
    this.showLoader=true;
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then( async (imageUrl) => {
      console.log("imageUrl", imageUrl);
      this.image = imageUrl;
      this.sendImage();
    },
    (err) => {
      console.log("select image:", err);
      this.showLoader=false;
    });
  }

  sendImage(){
    const fileTransfer = this.transfer.create();
    let options:FileUploadOptions={
      fileKey:"image",
      chunkedMode:false,
      headers:{}
    }

    var serverurl = this.kiaProviderService.baseURL + "ImageUploadOneByOne";
    fileTransfer.upload(this.image,serverurl,options).then((data)=>{
      let imageurl = data.response.substring(2,data.response.length-2);
      console.log(imageurl);
      let imageurlFixed = imageurl.replace(/\\/g, '');
      console.log("image url fixed", imageurlFixed)
      this.finalImageURL = imageurlFixed;
      this.showLoader=false;
      // alert("Successfully uploaded");
      this.presentToast();
    })
  }

  selectModel(ev){
    this.vehicle_model = ev.target.value;
  }

  submitDetails(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id,
      "description":this.partRequestForm.get('description').value,
      "image":this.finalImageURL,
      "vehicle_model_id":this.vehicle_model
    },
    url: any = this.kiaProviderService.baseURL + 'add-request-part';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("Request part success", data);
      this.router.navigateByUrl("/my-part-requests");
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry2();
    });
  }
  
  async deleteImage() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to delete this image?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.finalImageURL='';
          }
        }
      ]
    });
    await alert.present();
  }

  getVehicleModels() {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
    url: any = this.kiaProviderService.baseURL + 'get-vehicle-model';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("vehicle models data ", data);
      this.vehicleModels=data;
      console.log("vehicle models array ", this.vehicleModels);
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry1();
    }); 
  }

  async Retry1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getVehicleModels();
          }
        }
      ]
    });
    await alert.present();
  }

  async Retry2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.submitDetails();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully uploaded!',
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }
}
