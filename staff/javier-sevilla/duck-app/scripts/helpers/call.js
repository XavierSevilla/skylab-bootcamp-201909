function call(method, url, sendParameter,token, callback) {
    let headers = {}

    if (sendParameter) headers['Content-Type'] = 'application/json;charset=UTF-8'
    

    if (token) {
        headers['Authorization'] = `Bearer ${token}` 
    }
    
    fetch(method, url, headers, sendParameter, response=> {
        if (response.readyState == 4) {
            var result = JSON.parse(response.responseText);

            callback(result);
        }
    });
}