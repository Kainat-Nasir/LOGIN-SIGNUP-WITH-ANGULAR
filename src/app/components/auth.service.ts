import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken()); //for localstorage
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() { }
//for localstorage
  login(): void {
    // Save login state to local storage
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true);
  }
//for localstorage
  logout(): void {
    // Remove login state from local storage
    localStorage.removeItem('isLoggedIn'); 
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
//for localstorage
  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
