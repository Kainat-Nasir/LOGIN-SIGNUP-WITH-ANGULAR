import { Component } from '@angular/core';
import { AuthService } from './components/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-task';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() { //for localstorage
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
