import { Component, input } from '@angular/core';
import { ExerciceModel } from '../../models/ExerciceModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'iut-exercices',
  imports: [DatePipe],
  templateUrl: './exercices.html',
  styleUrl: './exercices.css',
})
export class Exercices {
  public exercices = input<ExerciceModel[]>([])
}
