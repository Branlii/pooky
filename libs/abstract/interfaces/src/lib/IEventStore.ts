export interface IEventStore<T> {
  store: T;
  appendEvent(streamId: string, event: unknown, type: string): Promise<void>;
  readStream<T = unknown>(streamId: string): Promise<T[]>;
}
