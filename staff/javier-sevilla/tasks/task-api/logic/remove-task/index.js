const validate = require('../../utils/validate')
const { NotFoundError, ConflictError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (id, taskId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(taskId)
    validate.string.notVoid('task id', taskId)

    const client = database()

    return client.connect()
        .then(connection => {
            const db = connection.db()

            users = db.collection('users')
            tasks = db.collection('tasks')

            return users.findOne({ _id: ObjectId(id) })
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                return tasks.findOne({ _id: ObjectId(taskId) })
                    .then(task => {
                        if (!task) throw new NotFoundError(`user does not have task with id ${taskId}`)

                        if (task.user != id) throw new ConflictError(`user with id ${id} does not correspond to task with id ${task.user}`)
                        
                        return tasks.deleteOne({ _id : ObjectId(taskId) })
                            .then(result => {
                                if (!result.deletedCount) throw Error('could no delete tasks')
                        })
                })
            })
    })

}