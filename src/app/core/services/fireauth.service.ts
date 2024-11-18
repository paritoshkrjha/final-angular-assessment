import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import { User } from '../../app.model';
import { FireStoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class FireAuthService {
  private user: User | null = null;

  constructor(private auth: Auth, private firestoreService: FireStoreService) {
    const user = this.getUserFromSession();
    if (user) {
      this.user = user;
    }
  }

  saveUserToSession(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromSession(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return !!this.user;
  }

  getRole() {
    return this.user?.role;
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      const userData = await this.firestoreService.getDocument(
        `users/${cred.user.uid}`
      );
      if (userData) {
        this.user = {
          id: userData['id'],
          name: userData['name'],
          email: userData['email'],
          role: userData['role'],
        };
        this.saveUserToSession(this.user);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw this.handleError(error);
    }
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    try {
      const cred = await createUserWithEmailAndPassword(
        this.auth,
        'bob.user@example.com',
        password
      );

      const userData: User = {
        id: cred.user.uid,
        name: 'Bob Member',
        email: 'bob.user@example.com',
        role: 'member',
      };

      this.user = userData;
      await this.firestoreService.createDocument(
        `users/${userData.id}`,
        userData
      );
    } catch (error) {
      console.error('Error signing up:', error);
      throw this.handleError(error);
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.user = null;
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email address is already in use!';
          break;
        case 'auth/invalid-email':
          errorMessage = 'This email address is invalid!';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email!';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password!';
          break;
        default:
          errorMessage = error.message;
          break;
      }
    }
    return new Error(errorMessage);
  }

  async fetchUserData(uid: string) {
    try {
      const userData = await this.firestoreService.getDocument(`users/${uid}`);
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw this.handleError(error);
    }
  }
}
