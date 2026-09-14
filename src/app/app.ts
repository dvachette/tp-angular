import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Exercices } from "./components/exercices/exercices";
import { ExerciceModel } from './models/ExerciceModel';
import { MessageModel } from './models/MessageModel';
import { Alert } from "./components/alert/alert";
@Component({
  selector: 'iut-root',
  imports: [RouterOutlet, Exercices, Alert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('donatien-first-project');
  public readonly exercices = signal<ExerciceModel[]>([
    {
      id: '1',
      title: 'intro Typescript',
      dueDate: new Date(2025, 9, 27),
      submitted: true
    },
    {
      id: '2',
      title: 'démarrage du joli gestionnaire de devoirs',
      dueDate: new Date(2025, 11, 3),
      submitted: false
    },
    {
      id: '3',
      title: 'ajout d\'un routeur',
      dueDate: new Date(2025, 12, 22),
      submitted: false
    },
  ]);
  public readonly alertMessages = signal<MessageModel[]>([]);
  constructor() {
    this.alertMessages.set(this.exercices().map((exercice, index) => {
      return {
        id: index,
        type: this.getAlertType(exercice),
        message: this.getAlertMessage(exercice)
      };
    }));
  }
  dismissAlertMessage(id: number): void {
    this.alertMessages.set(this.alertMessages().filter(message => message.id !== id));
  }
  getAlertMessage(exercice: ExerciceModel): string {
    if (exercice.submitted) {
      return 'Vous avez déjà rendu l\'exercice';
    } else {
      const now = new Date();
      if (now > exercice.dueDate) {
        return 'Vous n\'avez pas rendu l\'exercice à temps !';
      } else if ((exercice.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 1) { // less than or equal to 1 day
        return 'Vous n\'avez pas encore rendu l\'exercice, il est dû demain !';
      } else {
        return 'Vous n\'avez pas encore rendu l\'exercice.';
      }
    }
  }
  getAlertType(exercice: ExerciceModel): 'info' | 'warning' | 'error' | 'validation' {
    if (exercice.submitted) {
      return 'validation';
    } else {
      const now = new Date();
      if (now > exercice.dueDate) {
        return 'error';
      } else if ((exercice.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 1) { // less than or equal to 1 day
        return 'warning';
      } else {
        return 'info';
      }
    }
  }
}
