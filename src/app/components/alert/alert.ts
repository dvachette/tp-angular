import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'iut-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  public category = input.required<'validation' | 'error' | 'warning' | 'info'>()
  public dismiss = output<void>()
  public readonly onDismiss = signal<boolean>(false)

  dismissAlert(): void {
    this.onDismiss.set(true)
    setTimeout(() => {
      this.dismiss.emit()
    }, 300)
  }

}
