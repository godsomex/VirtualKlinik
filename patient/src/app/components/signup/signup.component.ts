import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegauthService } from '../../services/regauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  message;
  messageClass;

  constructor(private formBuilder: FormBuilder, private regauthService: RegauthService) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    });
  }

  // this block of code captures and submits form 
  onSignup() {
    const user = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
  };
    this.regauthService.signupUser(user).subscribe(data => {
      console.log(data);
        this.messageClass = 'alert alert-success';
        this.message = data.message;
    });
  }

  ngOnInit() {
  }

}
