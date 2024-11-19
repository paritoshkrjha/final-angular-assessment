import { Component, Input } from '@angular/core';
import { TasksService } from '../../../../core/services/tasks.service';
import { UsersService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { RootLayoutComponent } from '../../../../shared/layout/root-layout/root-layout.component';
import { FireAuthService } from '../../../../core/services/fireauth.service';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [NavbarComponent, RootLayoutComponent],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css',
})
export class ViewTaskComponent {
  @Input() id!: string;
  showEditTaskDialog = false;

  constructor(
    private taskService: TasksService,
    private authService: FireAuthService,
    private userService: UsersService,
    private router: Router,
  ) {}
  isDeleting = false;
  isEditing = false;
  submitted = false;

  get isAdmin() {
    return this.authService.getRole() === 'admin';
  }

  get isLoading() {
    return this.taskService.tasksLoading;
  }

  get taskDetails() {
    return this.taskService.getTaskById(this.id);
  }

  get userName() {
    return this.userService.getUserById(this.taskDetails?.assignedTo!)?.name;
  }

  get members() {
    return this.userService.getMembers();
  }

  getTaskStatus(status: string) {
    switch (status) {
      case 'pending':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  }

  handleDeleteTask() {
    this.isDeleting = true;
    this.taskService
      .deleteTask(this.id)
      .then(() => {
        console.log('Task deleted successfully');
        this.router.navigate(['/admin'], { replaceUrl: true });
      })
      .finally(() => {
        this.isDeleting = false;
      });
  }

  onEdit() {
    this.router.navigate(['/admin/edit', this.id]);
  }
}
