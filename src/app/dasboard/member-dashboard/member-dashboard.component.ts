import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RootLayoutComponent } from '../../shared/layout/root-layout/root-layout.component';
import { FireAuthService } from '../../core/services/fireauth.service';
import { TasksService } from '../../core/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [NavbarComponent, RootLayoutComponent],
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.css',
})
export class MemberDashboardComponent {
  constructor(
    private authService: FireAuthService,
    private taskService: TasksService,
    private router: Router,
  ) {}

  get memberSpecificTasks() {
    const userId = this.authService.getUserId();
    return this.taskService.getTasks().filter((task) => task.assignedTo === userId);
  }

  get isLoading() {
    return this.taskService.tasksLoading;
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

  handleTaskClick(id: string) {
    this.router.navigate(['member/task', id]);
  }
}
