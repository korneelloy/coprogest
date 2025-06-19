import { Injectable } from '@angular/core';
import { Person } from '../../model/person';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  private currentUser: Person | null = null;

  setUser(user: Person): void {
    this.currentUser = user;
  }

  getUser(): Person | null {
    return this.currentUser;
  }

  clearUser(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    if (this.currentUser) {
      return true;
    } else {
      return false;
    }
  }

}
