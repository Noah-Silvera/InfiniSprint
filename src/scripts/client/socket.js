define(['socket-io'], function (io) {
    var socket = io('http://localhost:80'); // io is imported in index.html

    return {
        emit: {
            refreshData: function () {
                socket.emit('refreshData');
            }
        },
        listen: {
            eventsUpdated: function (callback) {
                socket.on('eventsUpdated', function (data) {
                    callback(data);
                });
            },
            eventDeleted: function (callback) {
                socket.on('eventDeleted', function (data) {
                    callback(data);
                });
            }

        }
    };
});