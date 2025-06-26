import { registerAs } from '@nestjs/config';

export const EVENT_DISPATCHER_CONFIG_TOKEN = Symbol('EventDispatcherConfig');

export interface KafkaConfig {
  baseUrl?: string;
}

export const kafkaConfig = registerAs(EVENT_DISPATCHER_CONFIG_TOKEN, (): KafkaConfig => {
  return {
    baseUrl: process.env['KAFKA_BASE_URL'],
  };
});
