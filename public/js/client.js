const socketUrl = document.querySelector('#apiurl').innerHTML;
const localDb = new LocalDb();
const socket = io(socketUrl);
const onevent = socket.onevent;

socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call(this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};

socket.on("*", function (eventName, data) {
    const event = {
        id: Date.now() + eventName,
        name: eventName,
        payload: data,
        date: Date.now()
    }
    localDb.addReceivedEvent(event);
    renderReceivedEvents();
});
const sendEventForm = document.querySelector('.sendEventForm');
const jsonEditorContainer = document.getElementById("jsoneditor");
const jsonViewContainer = document.getElementById("jsonViewContainer");
const options = {
    mode: 'code'    
};
const editor = new JSONEditor(jsonEditorContainer, options);
const editor2 = new JSONEditor(jsonViewContainer, {});
let json = {
    "hello": "world"
};
editor.set(json);
sendEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const eventName = e.target.eventName.value
        const eventPayload = editor.get();
        socket.emit(eventName, eventPayload);
        localDb.addSentEvent({
            id: Date.now() + eventName,
            name: eventName,
            payload: eventPayload,
            date: Date.now()
        });
        renderSentEvents();
    } catch (error) {
        if (error) {
            //Handle error
            console.log(error.message);
        }
    }
});

const renderSentEvents = () => {
    const sentEventsList = document.querySelector('.sentEvents');
    sentEventsList.innerHTML = "";
    localDb.sentEvents.sort((a, b) => a.date >= b.date ? -1 : a.date < b.date ? 1 : 0);
    localDb.sentEvents.map(e => {
        const node = document.createElement("li");
        node.id = e.id;
        node.classList = "sentEvent";
        node.innerHTML = `${e.name} - ${e.date}`;
        node.addEventListener('click', e => {
            const { id } = event.target;
            if(id) {
                const event = localDb.getSentEvent(id);
                if(event) {
                    document.querySelector('.eventName').value = event.name;
                    editor.set(event.payload);
                }
            }
        });
        sentEventsList.appendChild(node);
    });
}

const renderReceivedEvents = () => {
    const receivedEventsList = document.querySelector('.receivedEvents');
    receivedEventsList.innerHTML = "";
    localDb.receivedEvents.sort((a, b) => a.date >= b.date ? -1 : a.date < b.date ? 1 : 0);
    localDb.receivedEvents.map(e => {
        const node = document.createElement("li");
        node.id = e.id;
        node.classList = "receivedEvent";
        node.innerHTML = `${e.name} - ${e.date}`;
        node.addEventListener('click', e => {
            const { id } = event.target;
            if(id) {
                const event = localDb.getReceivedEvent(id);
                if(event) {
                    editor2.set(event.payload)
                }
            }  
        })
        receivedEventsList.appendChild(node);
    });
}
renderSentEvents();
renderReceivedEvents();