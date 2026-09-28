export interface MessageModel {
  type: MessageType,
  message: string,
  id: number,
}
export type MessageType = 'info' | 'warning' | 'error' | 'validation'
