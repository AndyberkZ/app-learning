import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecommendationService } from '../../../../../shared/services/recommendation.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  standalone:true,
  //providers:[RecommendationService],
  imports:[MatTableModule, MatProgressBarModule, MatProgressSpinnerModule, MatPaginatorModule, CommonModule, MatExpansionModule,MatIconModule  ],
  styleUrls: ['./recommendation-list.component.scss']
})
export class StudentPerformanceComponent implements OnInit {
  studentName: string;
  dataSource = new MatTableDataSource<any>();
  recommendedActivities = [];
  factors: any;

  displayedColumns: string[] = ['title', 'contentTags', 'score', 'progress', 'completionTime', 'preference'];

  constructor(private recommendationService: RecommendationService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecomendacionWithId(id);
    }else{
      this.getRecomendacion();
    }

  }

  getRecomendacion(){
    this.recommendationService.getRecommendations('672fddc83d53293cac3fd5ae').subscribe(response => {
      this.studentName = response.studentName ?? 'N/A';
      this.dataSource.data = response.activities || [];
      this.recommendedActivities = response.recommendedActivities || [];
      this.factors = {
        preference: response.factors?.preference ? response.factors?.preference : 0,
        averageScore: response.factors?.averageScore ?? 0
      };
    }, error => {
      console.error('Error fetching recommendations:', error);
    });
  }

 getRecomendacionWithId(id: string) {
    this.recommendationService.getRecommendations(id).subscribe(response => {
      this.processResponse(response);
    }, error => {
      console.error('Error fetching recommendations:', error);
    });
  }

  private processResponse(response: any) {
    this.studentName = response.studentName ?? 'N/A';
    this.dataSource.data = response.activities || [];
    this.recommendedActivities = response.recommendedActivities || [];
    this.factors = {
      preference: response.factors?.preference ? response.factors?.preference : 0,
      averageScore: response.factors?.averageScore ?? 0
    };
  }

  normalizeScore(score: number): number {
  // Convierte el puntaje de escala 0-20 a 0-100
  return (score / 20) * 100;
}

getScoreColor(score: number): string {
  if (score >= 18) return 'primary';   // 16-20 (80-100%)
  if (score >= 13) return 'accent';    // 12-15.9 (60-79.9%)
  return 'warn';                           // 0-11.9 (0-59.9%)
}

  // getScoreColor(score: number): string {
  //   console.log('scoreeeee',score);
  //   if (score >= 18) return 'primary';
  //   if (score >= 13) return 'accent';
  //   return 'warn';
  // }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'primary';
    if (progress >= 50) return 'accent';
    return 'warn';
  }

//  getPreferenceStars(preference: number): number[] {
//   // Ensure preference is not negative before multiplication
//   const safePreference = Math.max(0, preference);

//   const starsCount = Math.round(safePreference * 5);

//   // Ensure starsCount is not negative in case of unexpected scenarios,
//   // though Math.max(0, preference) should handle most cases.
//   const finalStarsCount = Math.max(0, starsCount);

//   return Array(finalStarsCount).fill(0);
// }
}
