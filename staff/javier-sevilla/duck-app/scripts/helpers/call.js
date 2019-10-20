function call(method, url, sendParameter, callback) {
    let headers = {}

    if (sendParameter) headers['Content-Type'] = 'application/json;charset=UTF-8'

    fetch(method, url, headers,  sendParameter, response=> {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText);

            callback(result);
        }
    });
}