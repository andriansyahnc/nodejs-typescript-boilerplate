import {Listener} from "../types/listener";
import {Message, PubSub, Subscription} from "@google-cloud/pubsub";
import CustomQueue from "../queue/CustomQueue";

class CustomListener implements Listener {
    messageCount: number;
    pubsub: PubSub;
    subscription: Subscription;
    subscriptionName: string;
    timeout: number;

    customQueue: CustomQueue;

    constructor() {
        this.subscriptionName = "subscription";
        this.timeout = 10;
        this.messageCount = 0;
        this.pubsub = new PubSub();
        this.subscription = this.pubsub.subscription(this.subscriptionName);
        this.customQueue = new CustomQueue();
        this.customQueue.startQueue();
    }

    async listen(): Promise<any> {
        const messageHandler = async (message: Message) => {
            this.messageCount += 1;
            try {
                console.log('unparsed attributes message', JSON.stringify(message.attributes));
                const data = message.attributes;

                this.customQueue.queue?.add(data);

                message.ack();
            } catch (e) {
                console.error(e);
                throw e;
            }
        }

        console.log(`Listening to subscription name ${this.subscriptionName}`);
        this.subscription.on('message', messageHandler).on('error', console.error)

        setTimeout(() => {
            console.log(`Restarting listener ${this.subscriptionName}`);
            this.subscription.removeListener('message', messageHandler);
            this.subscription.removeListener('error', console.error);
            console.log(`${this.messageCount} message(s) received from ${this.subscriptionName}`);
            this.messageCount = 0;
            this.listen();
        }, this.timeout * 1000)
    }

}

export default CustomListener;