import { Component, OnInit } from '@angular/core';
import { KiaProviderService } from '../kia-provider.service';
import sliderAll from '../../assets/SliderAll.json';
import messageList from '../../assets/messageList.json';

@Component({
  selector: 'app-damage-estimate-view',
  templateUrl: './damage-estimate-view.page.html',
  styleUrls: ['./damage-estimate-view.page.scss'],
})
export class DamageEstimateViewPage implements OnInit {
  imgURLs=sliderAll;
  messages=messageList;
  constructor(
    public kiaProviderService: KiaProviderService
  ) { }

  ngOnInit() {
    console.log(this.kiaProviderService.isDamageEstimatePending);
  }

}
