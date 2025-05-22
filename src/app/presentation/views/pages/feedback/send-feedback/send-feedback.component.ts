import { Component } from '@angular/core';
import { RecommendationService } from '../../../../../shared/services/recommendation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  standalone:true,
  imports:[
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule
    ],
  styleUrls: ['./send-feedback.component.scss']
})
export class FeedbackSendComponent{
  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private recommendationService: RecommendationService) {
      const id = this.route.snapshot.paramMap.get('id');
    this.feedbackForm = this.fb.group({
      student: [this.getIdStudent()],
      activity: [id],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['']
    });
  }


  getIdStudent(): string {
    let token = localStorage.getItem('token') || '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;

  }
  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.recommendationService.sendFeedback(this.feedbackForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/activities/list']);
          console.log('Feedback enviado:', response);
        },
        error: (error) => {
          console.error('Error al enviar feedback:', error);
        }
      });
    }
  }
}
