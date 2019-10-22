function retrieveUser(id,token,callback) {
    if (typeof id !== 'string') throw new TypeError(id +  ' is not a string');
    if (typeof token !== 'string') throw new TypeError(token +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id ,undefined, token, result=> {
        if (result.error)
            callback(new Error(result.error))
        else {
            callback(undefined, result )

        }
    })
}