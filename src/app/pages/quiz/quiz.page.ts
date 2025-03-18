import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonHeader,IonTitle,IonToolbar,IonButtons,IonBackButton,IonButton,IonModal,IonCol,IonRow,} from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data.service';
import { inject } from '@angular/core';
import { Question } from 'src/app/services/question';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonRow,IonCol,IonModal,IonButton,IonBackButton,IonButtons,IonContent,IonHeader,IonTitle,IonToolbar,CommonModule,FormsModule,],
})

export class QuizPage implements OnInit {
  public questions: Question[] = [];
  public currentQuestionIndex = 0;
  public currentScore = 0;
  public currentElement: any;
  public answers: string[] = [];
  public answerSelected = false;
  public answerResult: string | null = null; // Ergebnis
  private router = inject(Router);
  public showExitButton = false;

  constructor(
    private dataService: DataService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.questions = this.dataService.currentQuiz.questions.sort(
      () => Math.random() - 0.5
    );
    this.loadQuestion();
    this.showExitButton = false;
  }

  loadQuestion() {
    this.currentElement = this.questions[this.currentQuestionIndex];
    this.answers = [
      this.currentElement.a1,
      this.currentElement.a2,
      this.currentElement.a3,
      this.currentElement.a4,
    ];
    this.answerSelected = false;
    this.answerResult = null; 
  }

  public answerMethod(index: number) {
    console.log('Answer selected:', index);
    if (this.answerSelected) return; 

    this.answerSelected = true;
    const isCorrect = index === this.currentElement?.correct;

    if (isCorrect) {
      this.currentScore++;
      this.answerResult = 'Richtig!';
    } else {
      this.answerResult = 'Falsch!';
    }
    this.showToast(this.answerResult, isCorrect ? 'success' : 'danger');
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color,
    });
    await toast.present();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      this.answerSelected = false;
      this.answerResult = `Quiz beendet! Dein Score: ${this.currentScore} von ${this.questions.length}`;
      this.showExitButton = true;
    }
  }

  exitQuiz() {
    this.router.navigate(['/home']);
  }
}
