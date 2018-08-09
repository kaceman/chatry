var socket = io();
var nickname = prompt('Enter your nickname!');
if (nickname) {
    socket.emit('name', nickname);
} else {
    socket.emit('name', 'Unknown');
}
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg) {
    $('#messages').prepend($('<li>').text(msg));
});
socket.on('connected', function(msg) {
    $('#messages').prepend($('<li style="color: green;">').text(msg));
});
socket.on('disconnected', function(msg) {
    $('#messages').prepend($('<li style="color: red;">').text(msg));
});
$('#m').keydown(function() {
    socket.emit('typing', 'yes');
});
$('#m').keyup(function() {
    socket.emit('typing', 'no');
});
socket.emit('typing', 'no');
socket.on('istyping', function(istyping) {
    if (istyping != '') {
        $('#typing').text(istyping);
    } else {
        $('#typing').text('');
    }
});