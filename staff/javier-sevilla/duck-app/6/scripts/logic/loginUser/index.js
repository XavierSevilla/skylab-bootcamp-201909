function loginUser(email, password, callback) {debugger;
    if (typeof email !== 'string') throw new TypeError(email +  ' is not a string');
    if (typeof password !== 'string') throw new TypeError(password +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('POST', 'https://skylabcoders.herokuapp.com/api/auth',function (result) {
        if (result.error)
            callback(new Error(result.error))
        else {
            const { data: { id, token } } = result

            callback(undefined, { id, token })
        }
    })
}