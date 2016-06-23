define(function () {

    var clientId = "228369885209-roa8qj072f7kc8afpnm5ig426uouj7v6.apps.googleusercontent.com";

    var scopes = "https://www.googleapis.com/auth/calendar";

    function checkAuth() {
        return new Promise(function (resolve, reject) {
            var successMes = 'successfully retrieved google auth';

            gapi.auth.authorize({ 'client_id': clientId, 'scope': scopes, 'immediate': true }).then(function (result) {
                // already have auth
                resolve(successMes);
            },function(err){
                alert('could not retrieve google authorization. The app cannot be used')
                throw err

            })
        });
    }

    return {
        'checkAuth': checkAuth
    };
});