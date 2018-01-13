import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RegauthService } from '../../services/regauth.service';
// import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationbarComponent implements OnInit {

  constructor(private regauthservice: RegauthService, private router: Router) { }

  onLogOutClick() {
    this.regauthservice.logout();
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}
