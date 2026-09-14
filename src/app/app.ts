import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from "./components/alert/alert";
import { Exercices } from "./components/exercices/exercices";
import { ExerciceModel } from './models/ExerciceModel';

@Component({
  selector: 'iut-root',
  imports: [RouterOutlet, Alert, Exercices],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('donatien-forst-project');
  private readonly maxCounter = 10
  protected readonly counter = signal<number>(this.maxCounter)
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
  constructor() {
    setInterval(() => { this.counter.set((this.counter() + 1) % this.maxCounter) }, 1000)
  }
}
