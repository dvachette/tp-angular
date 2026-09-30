import { Component, input, OnInit, output, signal } from '@angular/core';

@Component({
  selector: 'iut-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert implements OnInit {
  public category = input.required<'validation' | 'error' | 'warning' | 'info'>()
  public dismiss = output<void>()
  public readonly onDismiss = signal<boolean>(false)
  public readonly onCreate = signal<boolean>(false)

  ngOnInit(): void {
    this.onCreate.set(true);
    setTimeout(() => {
      this.onCreate.set(false)
    }, 300)
  }

  dismissAlert(): void {
    this.onDismiss.set(true)
    setTimeout(() => {
      this.dismiss.emit()
    }, 300)
  }

}
