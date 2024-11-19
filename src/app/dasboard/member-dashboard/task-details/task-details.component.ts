import { Component, Input } from '@angular/core';
import { TasksService } from '../../../core/services/tasks.service';
import { FireAuthService } from '../../../core/services/fireauth.service';
import { UsersService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RootLayoutComponent } from '../../../shared/layout/root-layout/root-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [NavbarComponent, RootLayoutComponent, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  showEditTaskDialog = false;
  taskStatusForm!: FormGroup;
  id!: string;

  constructor(
    private taskService: TasksService,
    private authService: FireAuthService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.taskStatusForm = new FormGroup({
      status: new FormControl(this.taskDetails?.status, Validators.required),
    });
  }

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
    return this.userService.getUserById(this.id)?.name;
  }

  getTaskStatus(status: string) {
    switch (status) {
      case 'pending':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  }

  onUpdateStatus() {
    this.taskService
      .updateTask({
        ...this.taskDetails!,
        status: this.taskStatusForm.value.status,
      })
      .then(
        () => {
          console.log('Task status updated successfully');
          this.router.navigate(['member']);
        },
        (error) => {
          console.log('Error updating task status', error);
        }
      );
  }
}
