import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import sliderAll from '../../assets/SliderAll.json';
import messageList from '../../assets/messageList.json';

@Component({
  selector: 'app-damage-estimate-respond',
  templateUrl: './damage-estimate-respond.page.html',
  styleUrls: ['./damage-estimate-respond.page.scss'],
})
export class DamageEstimateRespondPage implements OnInit {
  imgURLs=sliderAll;
  messages=messageList;
  public collitionForm : FormGroup;
  images:any[] = [];
  videos:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private imagePicker: ImagePicker,
    private camera: Camera) {
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
  }

  submitDetails(){
    this.router.navigateByUrl('/damage-estimate');
  }

  getImages(){
    var options:ImagePickerOptions={
      maximumImagesCount:10,
      outputType:1,
      width:100,
      height:100,
      allow_video:true
    }
    this.imagePicker.getPictures(options).then((results)=>{
      for(var i = 0; i<results.length; i++){
        // let filename = results[i].substring(results[i].lastIndexOf('/')+1);
        // let path = results[i].substring(0,results[i].lastIndexOf('/')+1);
        // console.log("filename: " + filename, " path: " + path);
        // this.file.readAsDataURL(path,filename).then((base64string)=>{
        //   this.images.push(base64string);
        //   console.log("base64string: " + base64string);
        // })
        let base64OfImage = "data:image/png;base64,"+results[i];
        this.images.push(base64OfImage);
      }
    },(err)=>{
      alert(JSON.stringify(err));
    })
  }

  getVideo(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType:0
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Video = 'data:video/mp4;base64,' + imageData;
      this.videos.push(base64Video);
     }, (err) => {
      alert(JSON.stringify(err));
     });
  }

}
