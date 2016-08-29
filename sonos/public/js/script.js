var socket = io();

$('form').on('click', 'input[type="radio"]', (e) => {
    socket.emit('update room', { room: e.target.name, action: e.target.value });
});

$('form').on('change', 'input[type="range"]', (e) => {
    console.log(e.target.name);
    socket.emit('update room volume', { room: e.target.name, volume: e.target.value });
});

// $('#playBedroom').on('click', () => {
//   socket.emit('music play');
// });
//
// $('#pauseBedroom').on('click', () => {
//   socket.emit('music pause');
// });
//
$('#favs').on('click', (e) => {
	e.preventDefault();
	socket.emit('get favorites');
})

socket.on('ace in the hole', function(msg) {
    console.log('here is my message', msg);

    var list = $('<ul></ul>');

    console.log(msg);

    list.html(msg.favoriteList.map((item) => {
        let className = '';
        if (item === msg.favorite) {
            className = 'class="selected"';
        }
        return `<li ${className}>${item}</li>`;
    }));

    $('#favs').after(list);
});
