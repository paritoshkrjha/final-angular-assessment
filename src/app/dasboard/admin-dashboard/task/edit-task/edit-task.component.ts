import { Component, inject, Input } from '@angular/core';
import { RootLayoutComponent } from '../../../../shared/layout/root-layout/root-layout.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { TasksService } from '../../../../core/services/tasks.service';
import { UsersService } from '../../../../core/services/user.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    RootLayoutComponent,
    NavbarComponent,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  submitted = false;
  isLoading = false;
  id: string;
  editTaskForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private taskService: TasksService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id')!;
    this.editTaskForm = new FormGroup({
      taskName: new FormControl(this.taskDetails?.title, {
        validators: [Validators.required],
      }),
      projectName: new FormControl(this.taskDetails?.projectName, {
        validators: [Validators.required],
      }),
      assignTo: new FormControl(this.taskDetails?.assignedTo, {
        validators: [Validators.required],
      }),
    });
  }

  get isTaskNameValid() {
    return (
      (this.editTaskForm.controls['taskName'].touched || this.submitted) &&
      this.editTaskForm.controls['taskName'].errors
    );
  }

  get isProjectNameValid() {
    return (
      (this.editTaskForm.controls['projectName'].touched || this.submitted) &&
      this.editTaskForm.controls['projectName'].errors
    );
  }

  get members() {
    return this.userService.getMembers();
  }

  get isAssignToValid() {
    return (
      (this.editTaskForm.controls['assignTo'].touched || this.submitted) &&
      this.editTaskForm.controls['assignTo'].errors
    );
  }

  get taskDetails() {
    return this.taskService.getTaskById(this.id);
  }

  onEditTask() {
    this.submitted = true;
    if (this.editTaskForm.invalid) {
      return;
    }
    const task = {
      id: this.id,
      title: this.editTaskForm.value.taskName!,
      projectName: this.editTaskForm.value.projectName!,
      assignedTo: this.editTaskForm.value.assignTo!,
      status: this.taskDetails?.status!,
    };
    this.isLoading = true;

    this.taskService
      .updateTask(task)
      .then(
        () => {
          console.log('Task updated successfully');
          this.router.navigate(['/admin'], { replaceUrl: true });
        },
        (error: any) => {
          console.log('Error:', error);
        }
      )
      .finally(() => {
        this.isLoading = false;
      });
  }

  get isFormDirty() {
    return (
      this.taskDetails?.title !== this.editTaskForm.value.taskName ||
      this.taskDetails?.projectName !== this.editTaskForm.value.projectName ||
      this.taskDetails?.assignedTo !== this.editTaskForm.value.assignTo
    );
  }
}
