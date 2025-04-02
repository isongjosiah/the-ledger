export interface IMessagingQueue {
  publish(message: string): Promise<string>;
  consume(
    consumerName: string,
    callback: (
      messageId: string,
      message: Record<string, string>,
    ) => Promise<void>,
  ): Promise<void>;
}
