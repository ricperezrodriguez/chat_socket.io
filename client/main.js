//
//var socket = io.connect('http://192.168.1.35:6677', {'forceNew':true});
var socket = io.connect();

socket.on('mensaje', (data) => {
    render(data);
});


let render = (data) => {
    let html = data.map((message, index) => {
        return(`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    let div_msg = document.getElementById('messages');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

addMensaje = (e) => {
    let m = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', m);
    return false;
}
