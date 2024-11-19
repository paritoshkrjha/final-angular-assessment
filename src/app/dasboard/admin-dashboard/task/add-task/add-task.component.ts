import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RootLayoutComponent } from '../../../../shared/layout/root-layout/root-layout.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { UsersService } from '../../../../core/services/user.service';
import { TasksService } from '../../../../core/services/tasks.service';
import { NewTask, Task } from '../../../../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RootLayoutComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  addTaskForm = new FormGroup({
    taskName: new FormControl('', {
      validators: [Validators.required],
    }),
    projectName: new FormControl('', {
      validators: [Validators.required],
    }),
    assignTo: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  submitted = false;
  isLoading = false;

  constructor(
    private userService: UsersService,
    private taskService: TasksService,
    private router: Router
  ) {}

  get isTaskNameValid() {
    return (
      (this.addTaskForm.controls['taskName'].touched || this.submitted) &&
      this.addTaskForm.controls['taskName'].errors
    );
  }

  get isProjectNameValid() {
    return (
      (this.addTaskForm.controls['projectName'].touched || this.submitted) &&
      this.addTaskForm.controls['projectName'].errors
    );
  }

  get isAssignToValid() {
    return (
      (this.addTaskForm.controls['assignTo'].touched || this.submitted) &&
      this.addTaskForm.controls['assignTo'].errors
    );
  }

  get members() {
    return this.userService.getMembers();
  }

  onAddTask() {
    this.submitted = true;
    if (!this.addTaskForm.valid) {
      return;
    }
    const task: NewTask = {
      title: this.addTaskForm.value.taskName!,
      projectName: this.addTaskForm.value.projectName!,
      assignedTo: this.addTaskForm.value.assignTo!,
      status: 'pending',
    };
    this.isLoading = true;
    this.taskService
      .addtask(task)
      .then(
        () => {
          console.log('Task added successfully');
          this.router.navigate(['admin']);
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
}
