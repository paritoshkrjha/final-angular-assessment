import { Injectable } from '@angular/core';
import { User } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [];

  setUser(users: User[]) {
    this.users = users;
  }

  getUser() {
    return this.users;
  }
}
