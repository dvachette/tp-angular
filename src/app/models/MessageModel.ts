export interface MessageModel {
  type: 'info' | 'warning' | 'error' | 'validation',
  message: string,
  id: number,
}
