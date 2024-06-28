import { LightningElement, track, wire } from 'lwc';
import { publish, MessageContext, subscribe } from 'lightning/messageService';
import SERVICE_MESSAGE_CHANNEL from '@salesforce/messageChannel/ServiceMessageChannel__c';

export default class Second extends LightningElement {
    @track inputValue = '';
    @track messageFromA = '';

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
            messageFromB: this.inputValue // Publie sur messageFromB
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
        this.messageFromA = message.messageFromA || 'No message received from A';
    }
}