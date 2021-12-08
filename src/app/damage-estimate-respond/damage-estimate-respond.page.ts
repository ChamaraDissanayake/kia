import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import sliderAll from '../../assets/SliderAll.json';
// import messageList from '../../assets/messageList.json';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { FilePath } from '@ionic-native/file-path/ngx';
import { KiaProviderService } from '../kia-provider.service';
import { AlertController, ToastController } from '@ionic/angular';

const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_FILE_SIZE = 20 * 1024 * 1024;

@Component({
  selector: 'app-damage-estimate-respond',
  templateUrl: './damage-estimate-respond.page.html',
  styleUrls: ['./damage-estimate-respond.page.scss'],
})
export class DamageEstimateRespondPage implements OnInit {
  // imgURLs=sliderAll;
  messages: any =[];
  
  // =messageList;
  public collitionForm : FormGroup;
  images:any = [];
  imageURLs:any = [];
  videoURLs:any = [];
  imageCount:number = 0;
  videoCount:number = 0;
  i = 0;
  j = 0;
  selectedVideo: string='';
  videoFileUpload: FileTransferObject;
  showLoader: boolean = false;

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
    private alertController: AlertController,
    private toastController: ToastController,
    private zone: NgZone) {
    this.collitionForm = this.formBuilder.group({
      description:[''],
    }); 
  }
// validation_messages = {
//   'description': [
//     { type: 'minlength', message: '* Description too short!' }
//   ]
// };

  ngOnInit() {
    this.imagePicker.hasReadPermission().then((val)=>{
      if(val == false){
        this.imagePicker.requestReadPermission();
      }
    },(err)=>{
      this.imagePicker.requestReadPermission();
    })
  }

  ionViewDidEnter(){
    this.getDetails();
  }

  getDetails(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "damage_estimate_id":this.kiaProviderService.damage_estimate_id
    },
    url: any = this.kiaProviderService.baseURL + 'getDamageEstimate';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("damage data ", data[0])
      this.messages = data[0].messages;
      this.imageURLs = data[0].imageList;
      this.videoURLs = data[0].videoList;
      this.imageCount = data[0].imageList.length;
      this.videoCount = data[0].videoList.length;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry1();
    }); 
  }

  submitDetails(){
    console.log(
      "user_id",this.kiaProviderService.user_id,
      "damage_estimate_id",this.kiaProviderService.damage_estimate_id,
      "message",this.collitionForm.get('description').value,
      "imageList",this.imageURLs,
      "videoList",this.videoURLs
    )
    if(this.imageURLs.length>this.imageCount || this.videoURLs>this.videoCount){
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {
        "user_id":this.kiaProviderService.user_id,
        "damage_estimate_id":this.kiaProviderService.damage_estimate_id,
        "message":this.collitionForm.get('description').value,
        "imageList":this.imageURLs,
        "videoList":this.videoURLs
      },
      url: any = this.kiaProviderService.baseURL + 'addRespondDamageEstimate';

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data: any) => {
        console.log("profile data ", data)
        if(data.message=='success'){
          this.router.navigateByUrl("/damage-estimate");
        }else{
          alert("Something went wrong!");
        }
      },
      (error: any) => {
        console.log('Something went wrong!', error);
        this.Retry2();
      });
    } else{
      alert("Upload at least one another image or video to continue.");
    }
  }
  

  sendImages(){
    const fileTransfer = this.transfer.create();
    let options:FileUploadOptions={
      fileKey:"image",
      chunkedMode:false,
      headers:{}
    }
    var serverurl = this.kiaProviderService.baseURL + "ImageUploadOneByOne";
    fileTransfer.upload(this.images[this.i],serverurl,options).then((data)=>{
      let imageurl = data.response.substring(2,data.response.length-2);
      console.log(imageurl);
      let imageurlFixed = imageurl.replace(/\\/g, '');
      console.log("video url fixed", imageurlFixed)
      this.imageURLs.push(imageurlFixed);
      this.i++;
      if(this.i<this.images.length){
        this.sendImages();
      }else{
        console.log("send images:",this.imageURLs);
        this.showLoader=false;
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

  getImages(){
    var options:ImagePickerOptions={
      maximumImagesCount:10,
      outputType:0
    }
    this.imagePicker.getPictures(options).then(async (selectedImage) => {
      if (selectedImage.length) {
        this.showLoader=true;
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
              alert("Maximum individual image size is 5MB!, balance images will be uploaded.");              
            }else{
              this.images.push(retrievedFile.nativeURL);
            }
            // if (data.type !== ALLOWED_MIME_TYPE) return console.log("Incorrect file type.");            
          });
        }
        setTimeout(() => {
          if (this.images.length > 0) {
            this.i = 0;
            this.sendImages();
          } else {
            this.showLoader = false;
          }
        }, 1000);

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

    this.camera.getPicture(options).then( async (videoUrl) => {
        if (videoUrl) {
          this.showLoader=true;
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
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
        console.log("Video select",err);
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
      .then((data)=>{
        let videourl = data.response.substring(2,data.response.length-2);
        let videourlFixed = videourl.replace(/\\/g, '');
        this.videoURLs.push(videourlFixed);
        this.showLoader=false;
        console.log("show loader", this.showLoader, "video url fixed", videourlFixed)
        // alert("Successfully uploaded!");
        this.presentToast();
        this.refresh();
      })
      .catch((err)=>{
        console.log(err)
        this.showLoader=false;
        alert("Video upload failed");
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
            this.getDetails();
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

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });    
  }
}
