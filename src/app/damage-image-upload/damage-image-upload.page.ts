import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';

// import sliderAll from '../../assets/SliderAll.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KiaProviderService } from '../kia-provider.service';
import { AlertController, ToastController } from '@ionic/angular';

const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_FILE_SIZE = 20 * 1024 * 1024;
// const ALLOWED_MIME_TYPE = "image/jpeg";

@Component({
  selector: 'app-damage-image-upload',
  templateUrl: './damage-image-upload.page.html',
  styleUrls: ['./damage-image-upload.page.scss'],
})
export class DamageImageUploadPage implements OnInit {
  public collitionForm: FormGroup;
  images: any = [];
  imageURLs: any = [];
  videoURLs: any = [];
  insurance: any = [];
  profile: any = [];
  insuranceId: string = '';
  vehicleId: string = '';
  i = 0;
  j = 0;
  selectedVideo: string = '';
  videoFileUpload: FileTransferObject;
  showLoader: boolean = false;
  isValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private imagePicker: ImagePicker,
    public file: File,
    private http: HttpClient,
    private camera: Camera,
    public kiaProviderService: KiaProviderService,
    // public filePath: FilePath,
    public transfer: FileTransfer,
    private zone: NgZone,
    private alertController: AlertController,
    private toastController: ToastController) {
    this.collitionForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  validation_messages = {
    'description': [
      { type: 'required', message: '* Description required!' },
      { type: 'minlength', message: '* Description too short!' }
    ]
  };

  ngOnInit() {
    this.imagePicker.hasReadPermission().then((val) => {
      if (val == false) {
        this.imagePicker.requestReadPermission();
      }
    }, (err) => {
      this.imagePicker.requestReadPermission();
    })
    this.getInsurances();
  }

  getInsurances(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
    url: any = this.kiaProviderService.baseURL + 'getInsurance';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("insurance data ", data)
      this.insurance = data;
      this.getMyDetails();
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
            this.getInsurances();
          }
        }
      ]
    });
    await alert.present();
  }

  submitDetails() {
    if(this.imageURLs.length>0 || this.videoURLs>0){
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "user_id": this.kiaProviderService.user_id,
        "description": this.collitionForm.get('description').value,
        "imageList": this.imageURLs,
        "videoList": this.videoURLs,
        "insurance_id": this.insuranceId,
        "vehicle_id": this.vehicleId
      },
      url: any = this.kiaProviderService.baseURL + 'addDamageEstimate';

    this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("profile data ", data)
        if (data.message == 'success') {
          this.router.navigateByUrl("/damage-estimate");
        } else {
          alert("Something went wrong!");
        }
      },
      (error: any) => {
        console.log('Something went wrong!', error);
        this.Retry2();
      });
    } else{
      alert("Upload at least one image or video to continue.");
    }
    
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


  sendImages() {
    const fileTransfer = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: "image",
      chunkedMode: false,
      headers: {}
    }
    var serverurl = this.kiaProviderService.baseURL + "ImageUploadOneByOne";
    fileTransfer.upload(this.images[this.i], serverurl, options).then((data) => {
      console.log("fileTransfer", data);
      let imageurl = data.response.substring(2, data.response.length - 2);
      console.log("imageurl",imageurl);
      let imageurlFixed = imageurl.replace(/\\/g, '');
      console.log("image url fixed", imageurlFixed)
      this.imageURLs.push(imageurlFixed);
      this.i++;
      if (this.i < this.images.length) {
        this.sendImages();
      } else {
        console.log("send images:", this.imageURLs);
        this.showLoader = false;
        this.images=[];
        this.presentToast();
        this.refresh();
      }
    }, (error) => {
      this.showLoader=false;
      console.log(error);
      alert("Sorry! file upload failed. Try another");
    });
  }

  // getImages() {
  //   this.showLoader = true;
  //   var options: ImagePickerOptions = {
  //     maximumImagesCount: 10,
  //     outputType: 1
  //   }
  //   this.imagePicker.getPictures(options).then((results) => {
  //     if (results.length) {
  //       for (var interval = 0; interval < results.length; interval++) {
  //         let url = 'data:image/jpeg;base64,' + results[interval]
  //         this.images.push(url);
  //       }

  //       setTimeout(() => {
  //         this.i = 0;
  //         this.sendImages();
  //       }, 1000);
  //     } else {
  //       this.showLoader = false;
  //     }
  //   }, (err) => {
  //     this.showLoader = false;
  //     alert(JSON.stringify(err));
  //   })
  //   console.log("images array", this.images, this.images[this.i]);
  // }

  getImages() {
    var options: ImagePickerOptions = {
      maximumImagesCount: 10,
      outputType: 0
    }
    this.imagePicker.getPictures(options).then(async (selectedImage) => {
      if (selectedImage.length) {
        this.showLoader = true;
        for (var interval = 0; interval < selectedImage.length; interval++) {
          console.log(selectedImage[interval]);
          var filename = selectedImage[interval].substring(selectedImage[interval].lastIndexOf('/') + 1);
          var dirpath = selectedImage[interval].substring(0, selectedImage[interval].lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
            console.log(err);
          }

          retrievedFile.file( data => {
            console.log("retrievedFile", data)
            if (data.size > MAX_IMAGE_FILE_SIZE){
              alert("Maximum individual image size is 5MB!, rest will be uploaded.");              
            }else{
              this.images.push(retrievedFile.nativeURL);
            }
            // if (data.type !== ALLOWED_MIME_TYPE) return console.log("Incorrect file type.");            
          });
        }

        if(this.images.length>0){
          setTimeout(() => {
            this.i = 0;
            this.sendImages();
          }, 1000);
        }else{
          this.showLoader=false;
        }

      } else {
        this.showLoader = false;
      }
    }, (err) => {
      this.showLoader = false;
      alert(JSON.stringify(err));
    })
    console.log("images array", this.images, this.images[this.i]);
  }

  selectVideo() {
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(async (videoUrl) => {
      if (videoUrl) {
        this.showLoader = true;
        var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
        var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

        dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;

        try {
          var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
          var retrievedFile = await this.file.getFile(dirUrl, filename, {});

        } catch (err) {
          alert("Error! Something went wrong.");
        }

        retrievedFile.file(data => {
          console.log("retrievedFile", data)
          if (data.size > MAX_VIDEO_FILE_SIZE){
            alert("Maximum video size is 20MB!");
            this.showLoader = false;
          }else{
            this.selectedVideo = retrievedFile.nativeURL;
            setTimeout(() => {
              this.uploadVideo()
            }, 1000);
          }
        });
      }
    },
      (err) => {
        console.log("Video upload", err);
        this.showLoader = false;
      });
  }

  uploadVideo() {
    var url = this.kiaProviderService.baseURL + "ImageUploadOneByOne";

    var filename = this.selectedVideo.substr(this.selectedVideo.lastIndexOf('/') + 1);

    var options: FileUploadOptions = {
      fileName: filename,
      fileKey: "video",
      mimeType: "video/mp4"
    }

    this.videoFileUpload = this.transfer.create();

    this.videoFileUpload.upload(this.selectedVideo, url, options)
      .then((data) => {
        let videourl = data.response.substring(2, data.response.length - 2);
        let videourlFixed = videourl.replace(/\\/g, '');
        this.videoURLs.push(videourlFixed);
        this.showLoader = false;
        console.log("show loader", this.showLoader, "video url fixed", videourlFixed)        
        this.presentToast();
        this.refresh();
      })
      .catch((err) => {
        console.log(err)
        this.showLoader = false;
        this.refresh();
        alert("Video upload failed");
      });
  }

  selectInsurance(event){
    console.log(event.target.value);
    this.insuranceId = event.target.value;
    if(this.vehicleId!='' && this.insuranceId!=''){
      this.isValid = true;
    }
  }

  selectVehicle(event){
    console.log(event.target.value);
    this.vehicleId = event.target.value;
    if(this.vehicleId!='' && this.insuranceId!=''){
      this.isValid = true;
    }
  }

  async deleteImage(i) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Are you sure want to delete this image?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.imageURLs.splice(i, 1);
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

  getMyDetails() {
    console.log(this.kiaProviderService.user_id, "user id")
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "user_id":this.kiaProviderService.user_id
    },
    url: any = this.kiaProviderService.baseURL + 'myProfile';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("profile data ", data)
      this.profile=data[0];
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry3();
    }); 
  }

  async Retry3() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert!',
      message: 'Check your connection and try again!',
      buttons: [{
          text: 'Try again',
          handler: () => {
            this.getMyDetails();
          }
        }
      ]
    });
    await alert.present();
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }
}
