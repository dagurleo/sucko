class LocalDb {
    constructor() {
        const sentEvents = localStorage.getItem('sentEvents');
        const receivedEvents = localStorage.getItem('receivedEvents');
        const socketUri = localStorage.getItem('socketUri');
        const socketPayload = localStorage.getItem('socketPayload');
        this.sentEvents = sentEvents ? JSON.parse(sentEvents) : [];
        this.receivedEvents = receivedEvents ? JSON.parse(receivedEvents) : [];
        this.socketUri = socketUri ? socketUri : null;
        this.socketPayload = socketPayload ? socketPayload : "";
    }

    saveSentEvents() {
        localStorage.setItem('sentEvents', JSON.stringify(this.sentEvents));
    }

    saveReceivedEvents() {
        localStorage.setItem('receivedEvents', JSON.stringify(this.receivedEvents));
    }

    addSentEvent(event) {
        this.sentEvents.push(event);
        this.saveSentEvents();
    }

    addReceivedEvent(event) {
        this.receivedEvents.push(event);
        this.saveReceivedEvents();
    }

    getSentEvent(eventId) {
        return this.sentEvents.find(e => e.id === eventId);
    }

    getReceivedEvent(eventId) {
        return this.receivedEvents.find(e => e.id === eventId);
    }

    removeSentEvent(eventId) {
        this.sentEvents = this.sentEvents.filter(e => e.id !== eventId);
        this.saveSentEvents();
    }

    removeReceivedEvent(eventId) {
        this.receivedEvents = this.receivedEvents.filter(e => e.id !== eventId);
        this.saveReceivedEvents();
    }

    changeSocketUri(socketUri, payload) {
        this.socketUri = socketUri;
        this.socketPayload = payload;
        localStorage.setItem('socketUri', this.socketUri);
        localStorage.setItem('socketPayload', this.socketPayload);
    }

    getSocketUri() {
        return this.socketUri;
    }

    getSocketPayload() {
        return this.socketPayload;
    }

}