import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private AuthService: AuthService,
    private Router: Router) { }

  ngOnInit() {
  }
  
  async loginGoogle(){
    let error = await this.AuthService.googleLogin()
    if(error==undefined){
      this.Router.navigate(['folder/Inbox']);
    }else{
      alert(JSON.stringify(error));
    }
  }

}
