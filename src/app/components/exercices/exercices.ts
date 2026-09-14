import { Component, input, signal } from '@angular/core';
import { ExerciceModel } from '../../models/ExerciceModel';

@Component({
  selector: 'iut-exercices',
  imports: [],
  templateUrl: './exercices.html',
  styleUrl: './exercices.css',
})
export class Exercices {
  public exercices = input<ExerciceModel[]>([])
}
