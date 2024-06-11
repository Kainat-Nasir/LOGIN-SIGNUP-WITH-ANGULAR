import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormGroup } from "@angular/forms";  
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  data: any;
  form: FormGroup = new FormGroup({});
  formSignup: FormGroup = new FormGroup({});
  passType = "password";
  showsection = false;
  hidesection= true;
  responseData: any;
  submitted: boolean = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({  
      'name': new FormControl('', {validators:[Validators.required, Validators.minLength(3)]}),   
      'password': new FormControl('', {validators: [Validators.required]})  
    });

    this.formSignup = new FormGroup({
      'username': new FormControl('',{validators:[Validators.required, Validators.minLength(6)]}),
      'password1': new FormControl('',{validators:[Validators.required, Validators.minLength(6)]}),
      'reEnterPassword': new FormControl('',{validators:[Validators.required]}),
    });

    this.fetchData();
  }   

  fetchData(): void {
    this.apiService.getData().subscribe(
      (data) => {
        this.responseData = data;
        console.log('Data received:', this.responseData);
      }
    );
  }

  postData() {
    if(this.formSignup.get("password1")?.value === this.formSignup.get("reEnterPassword")?.value){
      const data = { name: this.formSignup.get("username")?.value , password: this.formSignup.get("password1")?.value };
      console.log(data);

      this.apiService.postData(data).subscribe(
        (data) => {
          this.responseData = data;
          alert('Account Created Successfully '); 
          this.submitted = true;
        }
      );
      this.formSignup.reset();
    } else {
      alert('Password does not match');
    }
  }

  LoginForm() {
    let result = false;
    for(let i = 0; i < this.responseData.length; i++) {
      if (this.form.value.name == this.responseData[i].name && this.form.value.password == this.responseData[i].password) {
        result = true;
        break;
      }
    }
    if(result == true){
      alert("Logged In");
      this.authService.login(); //for localstorage
      this.router.navigate(['/']);
    } else {
      alert("Not Logged In");
    }
    this.form.reset();
  }

  showpassword(): void {
    if(this.passType === "password") {
      this.passType = "text";
    } else {
      this.passType = "password";
    }
  }

  signup(): void {
    this.showsection= true;
    this.hidesection=false;
  }
  
  login(): void {
    this.showsection= false;
    this.hidesection=true;
  }
}
