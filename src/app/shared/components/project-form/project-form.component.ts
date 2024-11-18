import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project, Task, User } from '../../../app.model';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, AddTaskDialogComponent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  submitted = false;
  taskSubmitted = false;
  showAddTaskDialog = false;
  tasks: Task[] = [];

  @Input() formGroup: FormGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  @Output() formValues = new EventEmitter<Project>();

  isFieldInvalid(fieldName: string) {
    return (
      (this.formGroup.controls[fieldName].touched || this.submitted) &&
      this.formGroup.controls[fieldName].errors
    );
  }

  openAddTaskDialog() {
    this.showAddTaskDialog = true;
  }

  onClose() {
    this.showAddTaskDialog = false;
  }

  addTask({ taskTitle, user }: { taskTitle: string; user: User }) {
    // const newTask: Task = {
    //   id: Math.random().toString(36),
    //   name: taskTitle,
    //   assignerToUserId: user.id,
    //   projecName: this.formGroup.value.title,
    //   assignedToUser: user.name,
    // };
    // this.tasks = [...this.tasks];
    // this.showAddTaskDialog = false;
  }

  onSubmit() {
    this.submitted = true;
  }
}
