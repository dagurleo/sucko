const socketUrl = document.querySelector('#apiurl').innerHTML;

console.log(socketUrl);
const socket = io(socketUrl);
const onevent = socket.onevent;
const receivedEvents = [];

socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call(this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};


socket.on("*", function (eventName, data) {
    console.log(data);
    const event = {
        id: Date.now() + eventName,
        name: eventName,
        data
    }
    receivedEvents.push(event);
    console.log(receivedEvents);

    const receivedEventsList = document.querySelector('.receivedEvents');
    const node = document.createElement("li");
    node.id = event.id;
    node.innerHTML = event.name;
    receivedEventsList.appendChild(node);

});




const sendEventForm = document.querySelector('.sendEvent');

const jsonEditorContainer = document.getElementById("jsoneditor");
const options = {
    mode: 'code'
};
const editor = new JSONEditor(jsonEditorContainer, options);

// set json
let json = {
    "hello": "world"
};
editor.set(json);


// get json
sendEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const eventName = e.target.eventName.value
        const eventPayload = editor.get();
        console.log(eventPayload);
        socket.emit(eventName, eventPayload);
    } catch (error) {
        if (error) {
            //Handle error
            console.log(error.message);
        }
    }
})