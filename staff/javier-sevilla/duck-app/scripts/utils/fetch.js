function fetch(method, url, headers, sendParameter, callback) {debugger;
    var xhr = new XMLHttpRequest;

    xhr.open(method, url);

    xhr.onreadystatechange = function () {
        callback(this);
    };

    if (headers) 
        for (let key in headers)
             xhr.setRequestHeader(key, headers[key])

    sendParameter? xhr.send(JSON.stringify(sendParameter)) : xhr.send();

}