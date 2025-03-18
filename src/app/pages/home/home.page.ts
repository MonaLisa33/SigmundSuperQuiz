import { Component, inject } from '@angular/core';
import {IonHeader,IonToolbar, IonTitle, IonContent, IonButton,} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  public data = inject(DataService);
  private router = inject(Router);
  constructor() {}

  showList() {
    this.router.navigate(['/question-list']);
  }

  startQuiz() {
    this.router.navigate(['/quiz']);
  }

  ngOnInit() {
    this.data.loadQuiz();
  }
}
