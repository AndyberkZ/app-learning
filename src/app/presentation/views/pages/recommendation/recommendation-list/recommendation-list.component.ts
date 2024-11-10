import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecommendationService } from '../../../../../shared/services/recommendation.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  standalone:true,
  //providers:[RecommendationService],
  imports:[MatTableModule, MatPaginatorModule, CommonModule, MatExpansionModule  ],
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
      console.log('responseresponse',response);
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

  getRecomendacionWithId(id:string){
    this.recommendationService.getRecommendations(id).subscribe(response => {
      console.log('responseresponse',response);
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
}
