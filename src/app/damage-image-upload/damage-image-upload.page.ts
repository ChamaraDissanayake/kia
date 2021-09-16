import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import sliderAll from '../../assets/SliderAll.json';


@Component({
  selector: 'app-damage-image-upload',
  templateUrl: './damage-image-upload.page.html',
  styleUrls: ['./damage-image-upload.page.scss'],
})
export class DamageImageUploadPage implements OnInit {
  imgURLs=sliderAll;
  public collitionForm : FormGroup;
  images:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private imagePicker: ImagePicker,
    private file: File) {
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
      maximumImagesCount:5,
      width:100,
      height:100
    }
    this.imagePicker.getPictures(options).then((results)=>{
      for(var i = 0; i<results.length; i++){
        let filename = results[i].substring(results[i].lastIndexOf('/')+1);
        let path = results[i].substring(0,results[i].lastIndexOf('/')+1);
        this.file.readAsDataURL(path,filename).then((base64string)=>{
          this.images.push(base64string);
        })
      }
    })
  }
}
