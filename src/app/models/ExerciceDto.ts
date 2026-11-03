import { ExerciceModel } from './ExerciceModel';

export type ExerciceDto = Omit<ExerciceModel, 'dueDate'> & {
  readonly dueDate: string;
};
