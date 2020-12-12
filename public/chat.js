// Make connection
const socket = io.connect('http://localhost:3000');

// Assign Sender Name
let handle='';
while(true){
    handle = prompt("Please enter your name");
    if (handle==null || handle==""){
        continue;
    }else{
        // Emit events
        socket.emit('join', handle);
        break;
    }
}

// Query DOM
const message = document.getElementById('message');
// const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


const audio = new Audio('notification.mp3');

const isMessageFieldEmpty = ()=>{
    if(message.value == "" || handle.value== ""){
        return true;
    }else{
        return false;
    }

}


btn.addEventListener('click', function(){
    // socket.emit('type_of_message', 'The message you want to send');
    if(!isMessageFieldEmpty()){
        socket.emit('sendMsg', {
            message: message.value,
            handle: handle
        });
        // output.innerHTML += '<p class="right"><strong>' + handle + ': </strong>' + message.value + '</p>';

        output.innerHTML+=`<div class="usermsg right">
                                <p><strong>${handle}</strong><br>${message.value}</p>
                            </div>`;
        message.value = "";
    }
    
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle);
});


// Listen for events
socket.on('join', (handle)=>{
    audio.play();
    output.innerHTML+=`<p class="center join">${handle} has joined the chat...</p>`;
});

socket.on('typing', function(data){
    feedback.innerHTML =  `${data} is typing a message...`;
    setTimeout(()=>{
        feedback.innerHTML="";
    },5000);
});

socket.on('recieveMsg', function(data){
    audio.play();
    feedback.innerHTML = '';
    // output.innerHTML += '<p class="left"><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    output.innerHTML+=`<div class="usermsg left">
                                <p><strong>${data.handle}</strong><br>${data.message}</p>
                        </div>`;
});

socket.on('disconnect', (handle)=>{
    output.innerHTML+=`<p class="center leave">${handle} has left the chat...</p>`;
});