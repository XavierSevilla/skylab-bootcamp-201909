function registerUser(email,password,name,surname,age,gender,callback) {debugger
    if (typeof email !== 'string') throw new TypeError(email +  ' is not a string')
    if (!email.trim().length) throw new ContentError('email is empty or blank')
    if (typeof password !== 'string') throw new TypeError(password +  ' is not a string')
    if (!password.trim().length) throw new ContentError('password is empty or blank')
    if (typeof name !== 'string') throw new TypeError(name +  ' is not a string')
    if (!name.trim().length) throw new ContentError('name is empty or blank')
    if (typeof surname !== 'string') throw new TypeError(surname +  ' is not a string')
    if (!surname.trim().length) throw new ContentError('surname is empty or blank')
    if (typeof age !== 'string') throw new TypeError(age +  ' is not a string')
    if (!age.trim().length) throw new ContentError('age is empty or blank')
    if (typeof gender !== 'string') throw new TypeError(gender +  ' is not a string')
    if (!gender.trim().length) throw new ContentError('gender is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback +  ' is not a function')

    call('POST', 'https://skylabcoders.herokuapp.com/api/user',{ username: email, password, name, surname, age, gender }, undefined, result=> {
        if (result.error)
            callback(new Error(result.error))
        else {
            const { data: { id } } = result

            callback(undefined, id )

        }
    })
}