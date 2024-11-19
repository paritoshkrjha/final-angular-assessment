import { Component } from '@angular/core';
import { RootLayoutComponent } from '../../../shared/layout/root-layout/root-layout.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { UsersService } from '../../../core/services/user.service';
import { FireAuthService } from '../../../core/services/fireauth.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [RootLayoutComponent, NavbarComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {
  loading = false;
  constructor(
    private userService: UsersService,
    private authService: FireAuthService
  ) {}

  get currentUserId() {
    return this.authService.getUserId();
  }

  get admins() {
    return this.userService
      .getAllUsers()
      .filter((user) => user.role === 'admin');
  }

  get members() {
    return this.userService.getMembers();
  }

  handleMakeUser(userId: string) {
    this.loading = true;
    this.userService
      .updateUserRole(userId, 'member')
      .then(
        () => {
          console.log('User role updated successfully');
        },
        (error) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }

  handleMakeAdmin(userId: string) {
    this.loading = true;
    this.userService
      .updateUserRole(userId, 'admin')
      .then(
        () => {
          console.log('User role updated successfully');
        },
        (error) => {
          console.log('Error:', error);
          
        }
      )
      .finally(() => {
        this.loading = false;
      });
  }
}
