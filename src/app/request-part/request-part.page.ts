import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { AlertController } from '@ionic/angular';
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

  showLoader: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,
    private camera: Camera,
    // public file: File,
    // private http: HttpClient,
    public kiaProviderService: KiaProviderService,
    public transfer: FileTransfer,
    private alertController: AlertController
    ) {
    this.partRequestForm = this.formBuilder.group({
      description:['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{9,}'), Validators.minLength(10)]],
    }); 
  }

  ngOnInit() {

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
      console.log(err);
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
      alert("Successfully uploaded");
    })
  }

  submitDetails(){
    console.log("SUBMIT")
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
}
