import { Component, OnInit } from '@angular/core';
import { KiaProviderService } from '../kia-provider.service';
// import sliderAll from '../../assets/SliderAll.json';
// import messageList from '../../assets/messageList.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-damage-estimate-view',
  templateUrl: './damage-estimate-view.page.html',
  styleUrls: ['./damage-estimate-view.page.scss'],
})
export class DamageEstimateViewPage implements OnInit {
  // imgURLs=sliderAll;
  messages;
  damageEstimatePdf: string = '';
  // =messageList;
  constructor(
    public kiaProviderService: KiaProviderService,
    private http: HttpClient,
    private router: Router,
    public file: File,
    public transfer: FileTransfer,
    private fileOpener: FileOpener,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.kiaProviderService.isDamageEstimatePending);
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
      console.log("damage data ", data)
      this.messages = data[0].messages;
      this.damageEstimatePdf = data[0].estimate_document;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
      this.Retry();
    }); 
  }

  gotoViewImages(){
    this.router.navigateByUrl("/view-images");
  }

  gotoViewVideos(){
    this.router.navigateByUrl("/view-videos");
  }

 download(name) {
    const fileTransfer = this.transfer.create();
    const pdfUrl = this.damageEstimatePdf;
    let options:FileUploadOptions={
      fileKey:"estimate",
      mimeType:"application/pdf",
      chunkedMode:false,
      headers:{}
    }
    console.log("pdf url", pdfUrl)
    fileTransfer.download(pdfUrl, this.file.dataDirectory + name, true, options).then((entry) => {
      console.log("entry",entry)
      // this.fileOpener.open(entry.toURL(), this.getMimeByExt(name))
      //   .then(() => console.log('File is opened'))
      //   .catch(e => console.log('Error opening file', e));
    }, (error) => {
      console.log(error);
    });
  }

  getMimeByExt(name: any) {
    var extention = name.split('.').pop();
    for (let i = 0; i < this.extToMimes.length; i++) {
      const element = this.extToMimes[i];
      if (element.ext == extention) {
        return element.MType;
      }
    }
  }

  extToMimes = [
    // { ext: 'jpeg', MType: 'image/jpeg' },
    // { ext: 'jpg', MType: 'image/jpeg' },
    // { ext: 'png', MType: 'image/png' },
    // { ext: 'doc', MType: 'application/msword' },
    // { ext: 'docx', MType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    // { ext: 'xls', MType: 'application/vnd.ms-excel' },
    // { ext: 'xlsx', MType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    // { ext: 'gif', MType: 'image/gif' },
    { ext: 'pdf', MType: 'application/pdf' }
  ]

  async Retry() {
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
}


// https://kiasl-content.s3.ap-southeast-1.amazonaws.com/uploads/promotion/2021/10/3e0ad2cef6_1633429835.pdf