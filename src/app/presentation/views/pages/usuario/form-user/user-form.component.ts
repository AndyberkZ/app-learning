import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentService } from '../../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
 styleUrls: ['./user-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['estudiante', Validators.required],
      age: [null, [Validators.min(1), Validators.max(120)]],
      dni: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentService.getStudents().subscribe((students) => {
        const student = students.find((s) => s._id === id);
        if (student) {
          this.studentForm.patchValue(student);
        }
      });
    }
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      return; // No continúa si el formulario es inválido
    }

    const studentData: Student = this.studentForm.value;

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.studentService.updateStudent(id, studentData).subscribe(() => {
        this.router.navigate(['/students/list']);
      });
    } else {
      this.studentService.createStudent(studentData).subscribe(() => {
        this.router.navigate(['/students/list']);
      });
    }
  }
  goList(){
    this.router.navigate(['/students/list'])
  }
}
