import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecommendationService } from '../../../../../shared/services/recommendation.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  standalone:true,
  //providers:[RecommendationService],
  imports:[MatTableModule, MatPaginatorModule, CommonModule, MatExpansionModule, MatIconModule  ],
  styleUrls: ['./list-activities.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  activities: any[] = [];
  displayedColumns: string[] = ['name', 'contentTags','actions'];

  constructor(private recommendationService: RecommendationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {
    this.recommendationService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
        console.log('this.activities',this.activities);
      },
      error: (error) => console.error('Error al obtener actividades:', error)
    });
  }

  feedback(id: string): void {
    this.router.navigate(['/activities/edit', id]);
  }
}
