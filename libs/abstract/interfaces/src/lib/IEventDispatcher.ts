export interface IEventDispatcher<T> {
  dispatcher: T;
  dispatchEvent(topic: string, message: string): Promise<void>;
}