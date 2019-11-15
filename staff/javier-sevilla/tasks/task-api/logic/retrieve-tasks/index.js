const validate = require('../../utils/validate')
const users = require('../../data/users')()
const tasks = require('../../data/tasks')()
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')

module.exports = function (user) {
    validate.string(user)
    validate.string.notVoid('user', user)

    return new Promise((resolve, reject) => {
        const tasks = tasks.data.find(task => task.user === user)

        if (!tasks) return reject(new NotFoundError(`task of user${user} not found`))

        resolve(tasks)
    })
}