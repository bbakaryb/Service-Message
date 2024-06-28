import { LightningElement, track, wire } from 'lwc';
import { publish, MessageContext, subscribe } from 'lightning/messageService';
import SERVICE_MESSAGE_CHANNEL from '@salesforce/messageChannel/ServiceMessageChannel__c';

export default class First extends LightningElement {
    @track inputValue = '';
    @track messageFromB = '';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    handleInputChange(event) {
        this.inputValue = event.target.value;
    }

    handleSendMessage() {
        const message = {
            message: this.inputValue
        };
        publish(this.messageContext, SERVICE_MESSAGE_CHANNEL, message);
    }

    subscribeToMessageChannel() {
        subscribe(
            this.messageContext,
            SERVICE_MESSAGE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.messageFromB = message.message || 'No message received';
    }
}