import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.page.html',
  styleUrls: ['./login-success.page.scss'],
})
export class LoginSuccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoHome(){
    this.router.navigateByUrl('/home', {replaceUrl:true});
  }
}
