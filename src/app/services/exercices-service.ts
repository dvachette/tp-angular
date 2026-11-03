import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ExerciceModel } from '../models/ExerciceModel';
import { LoggingService } from './logging-service';
import { ExerciceDto } from '../models/ExerciceDto';

@Injectable({
  providedIn: 'root',
})
export class ExerciceService {
  private readonly loggingService = inject(LoggingService);
  private readonly httpService = inject(HttpClient);
  private readonly API_URL = "https://6ae994ac3d3dd3d37be5325c.mockapi.io/api/exercices";

  private readonly exercices = signal<ExerciceModel[]>([]);
  public readonly tabExercices = this.exercices.asReadonly();

  private static toModel(dto: ExerciceDto): ExerciceModel {
    return { ...dto, dueDate: new Date(dto.dueDate) };
  }

  public load(): Observable<ExerciceModel[]> {
    return this.httpService.get<ExerciceDto[]>(this.API_URL).pipe(
      map((dtos: ExerciceDto[]) => dtos.map(ExerciceService.toModel)),
      tap({
        next: (data: ExerciceModel[]) => {
          this.exercices.set(data);
          this.loggingService.log(`Exercices fetched successfully: ${data.length} items.`);
        },
        error: (error: HttpErrorResponse) => {
          this.loggingService.log(`Error fetching exercices: ${error.message}`);
        },
      }),
    );
  }

  public getExerciceById(id: string): Observable<ExerciceModel> {
    return this.httpService.get<ExerciceDto>(`${this.API_URL}/${id}`).pipe(
      map(ExerciceService.toModel),
      tap({
        next: (data: ExerciceModel) => {
          this.loggingService.log(`Exercice fetched successfully: ${data.title}.`);
        },
        error: (error: HttpErrorResponse) => {
          this.loggingService.log(`Error fetching exercice with id ${id}: ${error.message}`);
        },
      }),
    );
  }
}
