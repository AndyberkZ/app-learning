import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Student, StudentService } from '../../../../../shared/services/user.service';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../../shared/services/auth.service';
import { LoginService } from '../../../../../shared/services/login.service';


import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers:[StudentService],
  imports:[CommonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatSortModule, MatInputModule, MatButtonModule      ],
  standalone:true,
 styleUrls: ['./user-list.component.scss']
})
export class StudentListComponent implements OnInit {
  // displayedColumns: string[] = ['name', 'email', 'role', 'dni', 'actions'];
  // students = [];

  // dataSource = new MatTableDataSource<Student>();

  // constructor(private studentService: StudentService, private router: Router, private loginService: LoginService) {}

  // ngOnInit(): void {
  //   this.fetchStudents();
  // }

  // // fetchStudents(): void {
  // //   this.studentService.getStudents().subscribe((data) => {
  // //     this.dataSource.data = data;
  // //   });
  // // }

  // fetchStudents(): void {
  //   this.studentService.getStudents().subscribe(students => {
  //     this.students = students;
  //   });
  // }

  // isAdmin(): boolean {
  //   return this.loginService.getRole() === 'admin';
  // }

  // editStudent(id: string): void {
  //   this.router.navigate(['/students/edit', id]);
  // }

  // deleteStudent(id: string): void {
  //   this.studentService.deleteStudent(id).subscribe(() => {
  //     this.fetchStudents();
  //   });
  // }

  // addStudent(): void {
  //   this.router.navigate(['/students/new']);
  // }


  displayedColumns: string[] = ['name', 'email', 'role', 'dni','actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.dataSource.data = students;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   editStudent(id: string): void {
    this.router.navigate(['/students/edit', id]);
  }

  goRecomendacion(id: string): void {
    this.router.navigate(['/students/performance', id]);
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.fetchStudents();
    });
  }
}