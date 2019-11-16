const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return new Promise((resolve, reject) => {
        const tasks = tasks.data.findIndex(task => task.user === user)

        if (!tasks) return reject(new NotFoundError(`task of user${user} not found`))

        resolve(tasks)
    })
}