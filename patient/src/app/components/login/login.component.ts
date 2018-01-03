import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegauthService } from '../../services/regauth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  constructor(private formBuidler: FormBuilder, private regauthService: RegauthService, private router: Router) {
    this.createForm();
   }

   createForm() {
     this.form = this.formBuidler.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
   }

   // functiuon to get all values entered by the user and store them in variable called user
  onlogin() {
     const user = {
       username: this.form.get('username').value,
       password: this.form.get('password').value
     };
    this.regauthService.login(user).subscribe(data => {
      if (data.success) {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.regauthService.browserUserData(data.token, data.user);
        setTimeout(() => {
          this.router.navigate(['/controlpanel']);
        }, 2000);
      }else {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }
    });
   }
  ngOnInit() {
  }

}
