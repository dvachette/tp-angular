import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExerciceModel } from '../../models/ExerciceModel';

type ExerciceStatus = 'validation' | 'warning' | 'error';

interface ExerciceView {
  readonly exercice: ExerciceModel;
  readonly status: ExerciceStatus;
  readonly label: string;
}

const STATUS_LABELS: Readonly<Record<ExerciceStatus, string>> = {
  validation: 'Rendu',
  warning: 'À rendre',
  error: 'En retard',
};

@Component({
  selector: 'iut-exercices',
  imports: [DatePipe],
  templateUrl: './exercices.html',
  styleUrl: './exercices.css',
})
export class Exercices {
  public readonly exercices = input<ExerciceModel[]>([]);

  public readonly views = computed<ExerciceView[]>(() => {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    return this.exercices().map((exercice: ExerciceModel): ExerciceView => {
      let status: ExerciceStatus = 'warning';
      if (exercice.submitted) {
        status = 'validation';
      } else if (exercice.dueDate < today) {
        status = 'error';
      }
      return { exercice, status, label: STATUS_LABELS[status] };
    });
  });
}
