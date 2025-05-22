import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../../../../../shared/services/recommendation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  standalone:true,
  imports:[
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule ,
    CommonModule,
    MatCardModule,
    MatTableModule, MatPaginatorModule,
    ],
  styleUrls: ['./list-feedback.component.scss']
})
export class FeedbackListComponent implements OnInit {
  analysisData: any;
  displayedColumns: string[] = ['activityName', 'averageRating', 'feedbackCount'];


  constructor(private recommendationService: RecommendationService) {

  }

  ngOnInit(): void {
    this.recommendationService.getFeedbackAnalysis().subscribe((data) => {
      this.analysisData = data.analysis;
    });
  }

  getRatingColor(rating: number): string {
  if (rating >= 4) return 'text-green';
  if (rating >= 3) return 'text-orange';
  return 'text-red';
}

}
