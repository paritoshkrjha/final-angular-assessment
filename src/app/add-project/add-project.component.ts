import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { RootLayoutComponent } from '../shared/layout/root-layout/root-layout.component';
import { ProjectFormComponent } from '../shared/components/project-form/project-form.component';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [NavbarComponent, RootLayoutComponent, ProjectFormComponent],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {}
