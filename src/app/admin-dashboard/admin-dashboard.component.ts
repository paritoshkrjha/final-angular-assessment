import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RootLayoutComponent } from '../shared/layout/root-layout/root-layout.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FireStoreService } from '../core/services/firestore.service';
import { User } from '../app.model';
import { UsersService } from '../core/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RootLayoutComponent, NavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  loading = false;
  users: User[] = [];
  constructor(
    private router: Router,
    private fireStore: FireStoreService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.fireStore
      .fetchUsers()
      .then((users) => {
        users.forEach((user) => {
          this.users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          });
        });
        this.usersService.setUser(this.users);
      })
      .finally(() => {
        console.log(this.users);
      });
  }

  handleAddProject() {
    this.router.navigate(['admin/add']);
  }
}
