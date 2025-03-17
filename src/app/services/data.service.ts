import { Injectable, inject } from '@angular/core';
import { Quiz } from './quiz';
import { Question } from './question';
import { v4 as uuidv4 } from 'uuid';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http: HttpClient = inject(HttpClient);
  public currentQuiz: Quiz = { id: '', quizName: 'newQuiz', questions: [] };

  constructor() {
    /*this.currentQuiz.questions.push({
      id: '1',
      title: 'What is the capital of France?',
      a1: 'New York',
      a2: 'London',
      a3: 'Paris',
      a4: 'Dublin',
      correct: 3,
    });*/
    //this.loadQuiz();
    this.loadQuizFromJSON();
  }

  public async loadQuiz() {
    try {
      let result = await Preferences.get({ key: 'SigmundSuperQuiz2025' });

      if (result.value) {
        this.currentQuiz = JSON.parse(result.value) as Quiz;
        console.log('Loaded quiz', this.currentQuiz);
      }
    } catch (error) {
      //console.error('Error loading quiz', error);
    }
  }

  public loadQuizFromJSON() {
    this.http.get<Quiz>('/assets/data.json').subscribe((data: Quiz) => {
      if (data && data.hasOwnProperty('quizName')) {
        this.currentQuiz = data;
      } else {
        console.error("oje:" + data);
      }
    });
  }

  public saveQuiz() {
    Preferences.set({
      key: 'SigmundSuperQuiz2025',
      value: JSON.stringify(this.currentQuiz),
    });
  }

  public getNewQuestion() {
    return {
      id: '0',
      title: '',
      a1: '',
      a2: '',
      a3: '',
      a4: '',
      correct: 1,
    };
  }

  public getQuestion(id: string): Question | undefined {
    return this.currentQuiz.questions.find((q) => q.id === id);
  }

  public addQuestion(q: Question) {
    if (q.id === '0') {
      q.id = uuidv4();
    }
    this.currentQuiz.questions.push(q);
    this.saveQuiz();
  }

  public deleteQuestion(q: Question) {
    this.currentQuiz.questions = this.currentQuiz.questions.filter(
      (question) => question.id !== q.id
    );
    this.saveQuiz();
  }
}
