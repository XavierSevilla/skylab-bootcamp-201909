function call(method, url, callback) {debugger;
    fetch(method, url, function (response) {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText);

            callback(result);
        }
    });
}