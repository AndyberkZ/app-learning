import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, StudentService } from '../../../../../shared/services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../../../../../shared/services/auth.service';
import { SuccessDialogComponent } from '../../../../../shared/component/modal-registrar/modal-registrar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatOptionModule,
    AsyncPipe,
    MatButtonModule],
 styleUrls: ['./user-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode: boolean = false;
  allCourses: string[] = [];


  separatorKeysCodes: number[] = [ENTER, COMMA];
  courseCtrl = new FormControl('');
  filteredCourses: Observable<string[]>;
  courses: string[] = ['Matemáticas'];

  @ViewChild('courseInput') courseInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private studentService: StudentService,
    private dialog: MatDialog,
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      cursosInteres: [[]]
    });
  }

  ngOnInit(): void {
    this.allCourses = this.studentService.getCourses();
    this.filteredCourses = this.courseCtrl.valueChanges.pipe(
      startWith(null),
      map((course: string | null) => (course ? this._filter(course) : this.allCourses.slice())),
    );
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentService.getStudents().subscribe((students) => {
        const student = students.find((s) => s._id === id);
        if (student) {
          this.studentForm.patchValue(student);
          console.log('studentstudent',student);
        }
      });
    }
  }

  isAdmin(): boolean {
    return this.authService.hasRole('admin');
  }
  isUser(): boolean {
    return this.authService.hasRole('estudiante');
  }

  isTeacher(): boolean {
    return this.authService.hasRole('profesor');
  }

  private filterCourses(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCourses.filter(course => course.toLowerCase().includes(filterValue));
  }

  // saveUser(): void {
  //   if (this.studentForm.invalid) {
  //     return;
  //   }

  //   const studentData: Student = this.studentForm.value;

  //   if (this.isEditMode) {
  //     const id = this.route.snapshot.paramMap.get('id')!;
  //     this.studentService.updateStudent(id, studentData).subscribe(() => {
  //       this.router.navigate(['/students/list']);
  //     });
  //   } else {
  //     this.studentService.createStudent(studentData).subscribe(() => {
  //       this.router.navigate(['/students/list']);
  //     });
  //   }
  // }



  saveUser(): void {
  if (this.studentForm.invalid) {
    return;
  }

  const studentData: Student = this.studentForm.value;

  if (this.isEditMode) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.studentService.updateStudent(id, studentData).subscribe({
      next: () => {
        this.showSuccessDialog(true);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
      }
    });
  } else {
    this.studentService.createStudent(studentData).subscribe({
      next: () => {
        this.showSuccessDialog(false);
      },
      error: (err) => {
        console.error('Error al crear:', err);
      }
    });
  }
}

private showSuccessDialog(isEdit: boolean): void {
  const dialogRef = this.dialog.open(SuccessDialogComponent, {
    width: '450px',
    data: { isEdit },
    disableClose: true,
    panelClass: 'success-dialog-container'
  });

  dialogRef.afterClosed().subscribe(() => {
    this.router.navigate(['/students/list']);
  });
}
  goList(){
    this.router.navigate(['/students/list'])
  }

    // Método para agregar un curso
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Añadir curso si no está ya en la lista
      if (value && !this.courses.includes(value)) {
        this.courses.push(value);
        this.studentForm.get('cursosInteres')!.setValue(this.courses);
      }

      // Limpiar el input
      event.chipInput!.clear();
      this.courseCtrl.setValue(null);
    }

    remove(course: string): void {
      const index = this.courses.indexOf(course);

      if (index >= 0) {
        this.courses.splice(index, 1);
        this.studentForm.get('cursosInteres')!.setValue(this.courses);
        this.announcer.announce(`Removed ${course}`);
      }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      const value = event.option.viewValue;
      if (!this.courses.includes(value)) {
        this.courses.push(value);
        this.studentForm.get('cursosInteres')!.setValue(this.courses);
      }
      this.courseInput.nativeElement.value = '';
      this.courseCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.allCourses.filter(course => course.toLowerCase().includes(filterValue));
    }

}
