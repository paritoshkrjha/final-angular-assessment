import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { RootLayoutComponent } from '../../shared/layout/root-layout/root-layout.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { User } from '../../app.model';
import { UsersService } from '../../core/services/user.service';
import { TasksService } from '../../core/services/tasks.service';

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
    private usersService: UsersService,
    private taskService: TasksService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.usersService.fetchUsers().then(
      (users) => {
        this.usersService.setUser(users);
      },
      (error) => {
        console.log('Error:', error);
      },
    );

    this.taskService
      .fetchTasks()
      .then(
        (tasks) => {
          this.taskService.setTasks(tasks);
        },
        (error) => {
          console.log('Error:', error);
        },
      )
      .finally(() => {
        this.loading = false;
      });
  }

  get tasks() {
    return this.taskService.getTasks();
  }

  getTaskStatus(status: string) {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'To Do';
    }
  }

  getUserName(userId: string) {
    const user = this.usersService.getUserById(userId);
    return user ? user.name : '';
  }

  handleAddProject() {
    this.router.navigate(['admin/add']);
  }

  navigateToManageUsers() {
    this.router.navigate(['admin/manage-users']);
  }

  handleTaskClick(id: string) {
    this.router.navigate(['admin/task', id]);
  }
}
