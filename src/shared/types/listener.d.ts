import {PubSub, Subscription} from "@google-cloud/pubsub";

export interface Listener {
    subscriptionName: string;
    pubsub: PubSub;
    subscription: Subscription;
    messageCount: number;
    timeout: number;
    listen(): void;
}
