import { Injectable, signal } from '@angular/core';
import { MessageModel, MessageType } from '../models/MessageModel';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private static _id = 0
  private messages = signal<MessageModel[]>([]);
  readonly tabMessages = this.messages.asReadonly()
  public fillWithExample(): void {
    this.messages.set(
      [
        {
          id: MessagesService._id++,
          message: "Douze",
          type: "info"
        },
        {
          id: MessagesService._id++,
          message: "Douze",
          type: "warning"
        },
        {
          id: MessagesService._id++,
          message: "Douze",
          type: "error"
        },
        {
          id: MessagesService._id++,
          message: "Douze",
          type: "validation"
        },

      ]
    )
  }
  public remove(id: number): MessageModel | null {
    const ret = this.messages().find(message => message.id === id) || null;
    this.messages.set(this.messages().filter(message => message.id !== id))
    return ret;
  }

  public add(message: string, category?: MessageType): MessageModel {
    const ret = {
      id: MessagesService._id++,
      message: message,
      type: category ?? "info"
    }
    this.messages.set([...this.messages(), ret])
    return ret
  }
}
