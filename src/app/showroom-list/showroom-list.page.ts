import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
import showroomslist from './../../assets/showroom-list.json';

@Component({
  selector: 'app-showroom-list',
  templateUrl: './showroom-list.page.html',
  styleUrls: ['./showroom-list.page.scss'],
})
export class ShowroomListPage implements OnInit {
  showroom = showroomslist;
  constructor(private router: Router, public kiaProviderService: KiaProviderService) { }

  ngOnInit() {
    console.log(this.showroom)
  }

  gotoLocationView(){
    this.router.navigateByUrl("/find-us");
  }
}
