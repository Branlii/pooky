export interface IEventPublisher<T> {
  publisher: T;
  publishEvent(topic: string, message: string): Promise<void>;
}