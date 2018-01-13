import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegauthService } from '../../services/regauth.service';
import { Profile } from 'selenium-webdriver/firefox';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  username;
  email;

  constructor(private regauthService: RegauthService) { }

  ngOnInit() {
    this.regauthService.getProfile().subscribe(dataprofile => {
      this.username = dataprofile.user.username;
      this.email = dataprofile.user.email;
    });
  }

}
