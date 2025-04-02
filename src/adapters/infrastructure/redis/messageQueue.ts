import { createClient, RedisClientType } from "redis";
import { IMessagingQueue } from "../../../domain/interfaces/messagingQueue";

export class RedisStreamQueue implements IMessagingQueue {
  private client: RedisClientType
  private streamKey: string
  private groupName: string

  constructor(streamKey: string, groupName: string) {
    this.streamKey = streamKey
    this.groupName = groupName
    this.client = createClient({
      url: '' //TODO: use config here
    })
    this.client.on('error', (err) => console.log(`[Redis]: error with handling redis action: ${err}`))
    this.client.connect().then(async() => {
      try {
        await this.client.xGroupCreate(this.streamKey, this.groupName, '$', {MKSTREAM: true})
      } catch(err:any) {
        if (err.message.includes("BUSYGROUP")) {
          console.log(`[Redis]: consumer group ${this.groupName} already exists`)
          return
        }
        console.error(`[Redis]: failed to create consumer group ${this.groupName} => ${err}`)
      }
    })
  }

  async publish(message: string): Promise<string> {
    const messageId = await this.client.xAdd(this.streamKey, '*', {message})
    return messageId
  }

  async consume(consumerName: string, callback: (messageId: string, message: Record<string, string>) => Promise<void>): Promise<void> {
    while (true) {
      try {
        const response = await this.client.xReadGroup(
          this.groupName,
          consumerName,
          {key: this.streamKey, id: '>'},
          {COUNT: 1, BLOCK: 0}
        );
        if (response) {
          for (const stream of response) {
            for (const message of stream.messages) {
              const [id, fields] = [message.id, message.message]
              try {
                await callback(id, fields) 
                // only acknowledge if processing was successful
                await this.client.xAck(this.streamKey, this.groupName, id)
              } catch(err) {
                console.error(`[Redis]: consumer ${consumerName} failed to process message ${id}`)
              }
            }
          }
        }
      } catch (err) {
        console.error(`[Redis]: consumer ${consumerName} failed to consume from stream => ${err}`)
      }
    }
  }
}
