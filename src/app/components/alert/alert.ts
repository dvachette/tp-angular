import { Component, input } from '@angular/core';

@Component({
  selector: 'iut-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  public category = input.required<'validation' | 'error' | 'warning' | 'info'>()
}
