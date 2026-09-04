import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Alert } from "./components/alert/alert";

@Component({
  selector: 'iut-root',
  imports: [RouterOutlet, Alert],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('donatien-forst-project');
  private readonly maxCounter = 10
  protected readonly counter = signal<number>(this.maxCounter)
  constructor() {
    setInterval(() => { this.counter.set((this.counter() + 1) % this.maxCounter) }, 1000)
  }
}
