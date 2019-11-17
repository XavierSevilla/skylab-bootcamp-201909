const validate = require('../../utils/validate')
const database = require('../../utils/database')
const { NotFoundError } = require('../../utils/errors')
const { ObjectId } = database

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    const client = database()

    return client.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(id) })
                .then(user => {
                    if (!user) throw new NotFoundError(`user with id ${id} not found`)

                    const { _id } = user

                    return users.updateOne({ _id }, { $set: { lastAccess: new Date } })
                        .then(result => {
                            if (!result.modifiedCount) throw Error('could not update user')

                            const { name, surname, email, username } = user

                            return { id, name, surname, email, username }
                        })
        
                })
        })
}