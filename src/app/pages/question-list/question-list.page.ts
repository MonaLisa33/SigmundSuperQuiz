import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
  standalone: true,
  imports: [
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonItem,
    IonList,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class QuestionListPage implements OnInit {
  private router = inject(Router);
  public data = inject(DataService);

  constructor() {}

  public show(arg0: string) {
    this.router.navigate(['/question', arg0]);
  }

  public delete(arg0: Question) {
    this.data.deleteQuestion(arg0);
  }

  ngOnInit() {}
}
