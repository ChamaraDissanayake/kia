import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import sliderAll from '../../assets/SliderAll.json';
// import messageList from '../../assets/messageList.json';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path/ngx';
import { KiaProviderService } from '../kia-provider.service';
import { AlertController } from '@ionic/angular';


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
    public filePath: FilePath,
    public transfer: FileTransfer,
    private alertController: AlertController,
    private zone: NgZone) {
    this.collitionForm = this.formBuilder.group({
      description:['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]{9,}'), Validators.minLength(10)]],
    }); 
  }
validation_messages = {
  'description': [
    { type: 'required', message: '* Description required!' },
    { type: 'pattern', message: '* Description too short!' }
  ]
};

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
        alert("Successfully uploaded");
      }
    })
  }

  getImages(){
    this.showLoader=true;
    var options:ImagePickerOptions={
      maximumImagesCount:5,
      outputType:1,
      width:100,
      height:100
    }
    this.imagePicker.getPictures(options).then((results)=>{
      for(var interval = 0; interval<results.length; interval++){
        let url = 'data:video/mp4;base64,'+results[interval]
        this.images.push(url);
      }

      setTimeout(() => {
        this.i=0;
        this.sendImages();
      }, 1000);
      
    },(err)=>{
      this.showLoader=false;
      alert(JSON.stringify(err));
    })
    console.log("images array", this.images, this.images[this.i]);
  }

  selectVideo() {
    this.showLoader=true;
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then( async (videoUrl) => {
        if (videoUrl) {
          
          var filename = videoUrl.substr(videoUrl.lastIndexOf('/') + 1);
          var dirpath = videoUrl.substr(0, videoUrl.lastIndexOf('/') + 1);

          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;
          
          try {
            var dirUrl = await this.file.resolveDirectoryUrl(dirpath);
            var retrievedFile = await this.file.getFile(dirUrl, filename, {});

          } catch(err) {
            alert("Error! Something went wrong.");
          }
          
          retrievedFile.file( data => {
            console.log(data);
            this.selectedVideo = retrievedFile.nativeURL;

            setTimeout(() => {
              this.uploadVideo()
            }, 1000);
          });
        }
      },
      (err) => {
        console.log(err);
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
        this.refresh();
        alert("Successfully uploaded!");
      })
      .catch((err)=>{
        console.log(err)
        this.showLoader=false;
        this.refresh();
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

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });    
  }
}
