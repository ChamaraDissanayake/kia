import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Platform } from '@ionic/angular';
import { KiaProviderService } from '../kia-provider.service';

// import data from './../../assets/feed.json';

@Component({
  selector: 'app-view-videos',
  templateUrl: './view-videos.page.html',
  styleUrls: ['./view-videos.page.scss'],
})
export class ViewVideosPage implements OnInit {
  videoPaused: boolean = true;
  videoId = 0;
  videos: any = [];

  // feed = data;
  @ViewChildren('player')videoPlayers: QueryList<any>;
  @ViewChildren('playImage')videoPlayButton: QueryList<any>;

  currentPlaying = null;
  
  constructor(
    private http: HttpClient,
    public kiaProviderService: KiaProviderService,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.getDetails();
  }

  playVideo(id){
    this.platform.ready().then(()=>{
      console.log("video id ",this.videoPlayButton.get(id).nativeElement.id);
    })
    this.videoPlayers.forEach(player =>{
      player.nativeElement.pause();
    })
    if(this.videoPaused){
      this.videoPlayers.get(id).nativeElement.play();
      this.videoPaused=false;
      this.videoId = this.videoPlayButton.get(id).nativeElement.id;
    }else{
      this.videoPlayers.get(id).nativeElement.pause();
      this.videoPaused=true;
      this.videoId = 100;
    }
  }

  getDetails(){
    console.log("working")
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
      "damage_estimate_id":this.kiaProviderService.damage_estimate_id
    },
    url: any = this.kiaProviderService.baseURL + 'getDamageEstimate';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log("video data ", data[0].videoList)
      this.videos = data[0].videoList;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    }); 
  }

}
