import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KiaProviderService } from '../kia-provider.service';
// import showroomslist from './../../assets/showroom-list.json';

@Component({
  selector: 'app-showroom-list',
  templateUrl: './showroom-list.page.html',
  styleUrls: ['./showroom-list.page.scss'],
})
export class ShowroomListPage implements OnInit {
  // showroom = showroomslist;
  showroom;

  constructor(
    private router: Router,
    public kiaProviderService: KiaProviderService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getShowroomList()
  }

  gotoLocationView(showroomId){
    this.kiaProviderService.showroom_id=showroomId;
    this.router.navigateByUrl("/find-us");
  }

  getShowroomList(){
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: any = {
    },
    url: any = this.kiaProviderService.baseURL + 'getAllShopList';

    this.http.post(url, JSON.stringify(options), headers)
    .subscribe((data: any) => {
      console.log(`Congratulations data was `, data);
      this.showroom = data;
    },
    (error: any) => {
      console.log('Something went wrong!', error);
    }); 
  }
}
