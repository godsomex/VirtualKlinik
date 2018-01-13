const socket = io.connect('http://localhost:9000');

//Query Dom 
const msg = document.getElementById('msg');
const chatuser = document.getElementById('chatUser');
const msgbtn = document.getElementById('sendMsg');
const msgoutput = document.getElementById('output');
const typingStatus = document.getElementById('typingStatus');
//Emit Events 
msgbtn.addEventListener('click',()=>{
  socket.emit('chat', {
      message: msg.value,
      chatUser: chatuser.value,
  })
})
msg.addEventListener('keypress', () => {
    
    socket.emit('typing', chatuser.value);
})

socket.on('chat', (data)=>{
    typingStatus.innerHTML = '';
    msgoutput.innerHTML+='<p><strong>' + data.chatUser + '<strong>'+': ' + data.message + '</p>';
})

socket.on('typing', (data) => {
    typingStatus.innerHTML = '<p><em>' + data + ' is typing a message </em></p>';
})
