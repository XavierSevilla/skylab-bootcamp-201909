const validate = require('../../utils/validate')
const { NotFoundError, ConflictError } = require('../../utils/errors')
const database = require('../../utils/database')
const { ObjectId } = database

module.exports = function (id, taskId, title, description, status) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(taskId)
    validate.string.notVoid('task id', taskId)
    if (title) {
        validate.string(title)
        validate.string.notVoid('title', title)
    }
    if (description) {
        validate.string(description)
        validate.string.notVoid('description', description)
    }
    if (status) {
        validate.string(status)
        validate.string.notVoid('status', status)
        validate.matches('status', status, 'TODO', 'DOING', 'REVIEW', 'DONE')
    }

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

                        title ? title : title = task.title
                        description ? description : description = task.description
                        status ? status : status = task.status
                        
                        return tasks.updateOne({ _id : ObjectId(taskId) },
                                           { $set: { title : title, description : description, status : status, lastAccess: new Date}})
                            .then(result => {
                                if (!result.modifiedCount) throw Error('could not update tasks')
                        })
                })
            })
    })

}
