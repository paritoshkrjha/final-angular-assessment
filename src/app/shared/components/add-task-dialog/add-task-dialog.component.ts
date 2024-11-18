import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../../app.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css',
})
export class AddTaskDialogComponent {
  taskForm = new FormGroup({
    title: new FormControl('Assign To', {
      validators: [Validators.required],
    }),
    user: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  get users() {
    return this.usersService.getUser();
  }

  constructor(private usersService: UsersService) {}

  addTaskForm = new FormGroup({
    title: new FormControl('', {}),
    assignTo: new FormControl('', {}),
  });

  @Output() onClose = new EventEmitter<void>();
  @Output() onAddTask = new EventEmitter<{
    title: string;
    user: User;
  }>();

  OnCancel() {
    this.onClose.emit();
  }

  onSubmit() {
    this.onAddTask.emit({
      title: this.taskForm.value.title!,
      user: this.taskForm.value.user!,
    });
  }
}
