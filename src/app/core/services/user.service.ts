import { Injectable } from '@angular/core';
import { User } from '../../app.model';
import { FireStoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [];
  loading = false;

  constructor(private firestoreService: FireStoreService) {
    this.loading = true;
    this.fetchUsers()
      .then(
        (users) => {
          this.setUser(users);
        },
        (error) => {
          console.log('Error:', error);
        },
      )
      .finally(() => {
        this.loading = false;
      });
  }

  fetchUsers() {
    return this.firestoreService.getCollection('users');
  }

  setUser(users: User[]) {
    this.users = users;
  }

  getMembers() {
    return this.users.filter((user) => user.role === 'member');
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  updateUserRole(id: string, role: 'admin' | 'member') {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.role = role;
    }
    return this.firestoreService.updateDocument(`users/${id}`, user);
  }
}
