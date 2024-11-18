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

  constructor(private auth: Auth, private firestoreService: FireStoreService) {}

  isLoggedIn() {
    return !!this.user;
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      const userData = await this.firestoreService.getDocument(
        `users/${cred.user.uid}`
      );
      console.log(userData);
    } catch (error) {
      console.error('Error signing in:', error);
      throw this.handleError(error);
    }
  }

  async signUpWithEmailAndPassword(email : string, password: string) {
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
