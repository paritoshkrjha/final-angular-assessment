import { Component, Input } from '@angular/core';
import { FireAuthService } from '../../../core/services/fireauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input({
    required: true,
  })
  title!: string;

  constructor(private authService: FireAuthService, private router : Router) {}

  handleLogOut() {
    this.authService.signOut().then(
      () => {
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      () => {
        alert('Error signing out');
      }
    );
  }
}
