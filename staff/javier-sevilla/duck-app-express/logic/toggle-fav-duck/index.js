const call = require('../../helpers/call')
const validate = require('../../utils/validate')

module.exports = function (id, token, duckId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)
    validate.string.notVoid('token', token)
    if (typeof duckId !== 'string') throw new TypeError(duckId + ' is not a string')
    if (!duckId.trim().length) throw new ContentError('duck id is empty or blank')

    return new Promise((resolve, reject) => {
        call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
            if (result.error) return reject(new Error(result.error))

            const { data: { favs = [] } } = result

            const index = favs.findIndex(fav => fav === duckId)

            index > -1 ? favs.splice(index, 1) : favs.push(duckId)

            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs }, result => {
                result.error ? reject(new Error(result.error)) : resolve()
            })
        })
    })
}