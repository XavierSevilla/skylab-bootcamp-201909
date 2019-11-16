const { expect } = require('chai')
const { random } = Math
const users = require('../../data/users')('test')
const tasks = require('../../data/tasks')('test')
const removeTask = require('.')
const uuid = require('uuid/v4')
const { NotFoundError } = require('../../utils/errors')
const uuid = require('uuid')

describe('logic - remove task', () => {
    before(() =>  Promise.all([users.load(), tasks.load()]))

    let id, name, surname, email, username, password, title, description

    beforeEach(() => {
        id = uuid()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        users.data.push({ id, name, surname, email, username, password })

        title = `title-${random()}`
        description = `description-${random()}`

        const task = {
            id: uuid(),
            user: id,
            title,
            description,
            status: 'TODO',
            date: new Date
        }

        tasks.data.push(task)

    })
        

    it('should succeed on correct remove task', () =>{
        const idTask = task.id
        removeTask(id, idtask)
            .then(() => {
                const task = tasks.data.find(task => task.id === id)
                expect(task).to.not.exist
            })
        })

    // TODO other cases
})