define(['socket-io'],function (io) {

    // how long to wait for GAPI to load before bombing
    var gapiLoadTimeout = 10000

    var clientId = null;

    var scopes = "https://www.googleapis.com/auth/calendar";

    var socket = io('http://localhost:80');
    socket.on('test',function(data){
        console.info('message recieved')
        console.debug(JSON.stringify(data))
    })

    function checkAuth() {
        return new Promise(function (resolve, reject) {

            checkGAPI().then(function(){

                var successMes = 'successfully retrieved google auth';

                gapi.auth.authorize({ 'client_id': clientId, 'scope': scopes, 'immediate': true }).then(function (result) {
                    // already have auth
                    resolve(successMes);
                })
            }).catch(function(err){
                reject(err)
            })

        });
    }

    function checkGAPI() {
        return new Promise(function(resolve,reject){
            // if gapi hasn't loaded in ten seconds, bail
            setTimeout(reject,gapiLoadTimeout)
            if (gapi && gapi.client) {
                // ensure we have access to google
                resolve()
            } else {
                setTimeout(checkGAPI, 100);
            }

        })
    }


    return {
        'checkAuth': checkAuth
    };
});