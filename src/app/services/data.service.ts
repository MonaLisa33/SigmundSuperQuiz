import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public currentQuiz: Quiz = { id: '', quizName: 'newQuiz', questions: [] };

  constructor() {
    this.currentQuiz.questions.push({
      id: '1',
      title: 'What is the capital of France?',
      a1: 'New York',
      a2: 'London',
      a3: 'Paris',
      a4: 'Dublin',
      correct: 3,
    });
  }
}
