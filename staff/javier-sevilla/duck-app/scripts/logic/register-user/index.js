function registerUser(email,password,name,surname,age,gender,callback) {
    if (typeof email !== 'string') throw new TypeError(email +  ' is not a string');
    if (typeof password !== 'string') throw new TypeError(password +  ' is not a string');
    if (typeof name !== 'string') throw new TypeError(name +  ' is not a string');
    if (typeof surname !== 'string') throw new TypeError(surname +  ' is not a string');
    if (typeof age !== 'string') throw new TypeError(age +  ' is not a string');
    if (typeof gender !== 'string') throw new TypeError(gender +  ' is not a string');
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function');

    call('POST', 'https://skylabcoders.herokuapp.com/api/user',{ username: email, password, name, surname, age, gender }, undefined, result=> {
        if (result.error)
            callback(new Error(result.error))
        else {
            const { data: { id } } = result

            callback(undefined, id )

        }
    })
}