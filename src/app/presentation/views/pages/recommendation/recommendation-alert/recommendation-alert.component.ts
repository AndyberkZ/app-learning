import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecommendationService } from '../../../../../shared/services/recommendation.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth.service';
import { LoginService } from '../../../../../shared/services/login.service';
import { StudentService } from '../../../../../shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-recommendation-alert',
  templateUrl: './recommendation-alert.component.html',
  standalone:true,
  //providers:[RecommendationService],
  imports:[CommonModule, MatIconModule, MatProgressBarModule, ReactiveFormsModule, MatCardModule, MatProgressSpinnerModule  ],
  styleUrls: ['./recommendation-alert.component.scss']
})
export class AlertPerformanceComponent {
  studentName: string;
  dataSource = new MatTableDataSource<any>();
  recommendedActivities = [];
  factors: any;
  performanceData: any;
  isLoading = true;
  error: string | null = null;

  displayedColumns: string[] = ['title', 'contentTags', 'score', 'progress', 'completionTime', 'preference'];

  constructor(private authService: AuthService, private loginService: LoginService, private studentService: StudentService) {
    this.getPerformanceData();
  }

  isUser(): boolean {
    return this.authService.hasRole('estudiante');
  }

  getPerformanceData(): void {
    let token = localStorage.getItem('token') || '';
    const payload = JSON.parse(atob(token.split('.')[1]));

    this.studentService.getAveragePerformance(payload.id).subscribe(
      (data) => {
        this.performanceData = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'No se pudo cargar el rendimiento del estudiante.';
        console.error('Error:', error);
        this.isLoading = false;
      }
    );
  }

  getPerformanceClass(category: string): string {
    switch (category) {
      case 'Excelente':
        return 'excellent-performance';
      case 'Normal':
        return 'normal-performance';
      case 'Bajo':
        return 'low-performance';
      default:
        return '';
    }
  }

  getProgressColor(score: number): string {
    if (score >= 18) return 'primary';
    if (score >= 13) return 'accent';
    return 'warn';
  }
}
