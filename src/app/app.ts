import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Exercices } from "./components/exercices/exercices";
import { ExerciceModel } from './models/ExerciceModel';
import { MessageModel } from './models/MessageModel';
import { Alert } from "./components/alert/alert";
import { ReversePipe } from './pipes/reverse-pipe';
import { MessagesService } from './services/messages-service';
import { filter, interval, map, take, tap } from 'rxjs';
import { ExerciceService } from './services/exercices-service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'iut-root',
  imports: [RouterOutlet, Exercices, Alert, ReversePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('donatien-first-project');
  private readonly messageService = inject(MessagesService)
  private readonly exercisesService = inject(ExerciceService)
  public readonly alertMessages = this.messageService.tabMessages
  public readonly exercices = this.exercisesService.tabExercices
  ngOnInit() {
    interval(1000).pipe(
      map((x) => x * 2),
      filter(x => x > 10),
      take(4),
      tap(() => this.messageService.add("Hey from pipe", "info"))
    ).subscribe((value) => console.log(value))
    this.exercisesService.load().subscribe({
      error: (error: HttpErrorResponse) => {
        this.messageService.add(`Error fetching exercices: ${error.message}`, "error");
      },
    });
  }

  dismissAlertMessage(id: number): void {
    this.messageService.remove(id)
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
