require('dotenv').config()
const { expect } = require('chai')
const { env: { DB_URL_TEST } } = process
const listTasks = require('.')
const { random } = Math
const database = require('../../utils/database')
const { NotFoundError } = require('../../utils/errors')
const uuid = require('uuid')

describe('logic - list tasks', () => {
    let client, tasks, users

    console.log('entro')

    before(() => {
        client = database(DB_URL_TEST)

        console.log('entro1')

        return client.connect()
            .then(connection => {
                const db = connection.db()

                users = db.collection('users')
                tasks = db.collection('tasks')
            })

        
    })

    let id, name, surname, email, username, password, taskIds, titles, descriptions

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        console.log('entro2')

        return users.insertOne({ name, surname, email, username, password })
            .then(result => {
                id = result.insertedId.toString()


                taskIds = []
                titles = []
                descriptions = []
                tasksAux = []

                console.log('entro3')

                for (let i = 0; i < 10; i++) {
                    tasksAux[i] = {
                        user: id,
                        title: `title-${random()}`,
                        description: `description-${random()}`,
                        status: 'REVIEW',
                        date: new Date
                    }
                }

                return tasks.insert(tasksAux)
                    .then(results => {
                        console.log(results)
                        idTask = results.insertedId.toString()
                        taskIds.push(idTask)
                        titles.push(task.title)
                        descriptions.push(task.description)
                    })
            })

        it('should succeed on correct user and task data', () =>
            listTasks(id)
                .then(tasks => {
                    expect(tasks).to.exist
                    expect(tasks).to.have.lengthOf(10)

                    tasks.forEach(task => {
                        expect(task.id).to.exist
                        expect(task.id).to.be.a('string')
                        expect(task.id).to.have.length.greaterThan(0)
                        expect(task.id).be.oneOf(taskIds)

                        expect(task.user).to.equal(id)

                        expect(task.title).to.exist
                        expect(task.title).to.be.a('string')
                        expect(task.title).to.have.length.greaterThan(0)
                        expect(task.title).be.oneOf(titles)

                        expect(task.description).to.exist
                        expect(task.description).to.be.a('string')
                        expect(task.description).to.have.length.greaterThan(0)
                        expect(task.description).be.oneOf(descriptions)

                        expect(task.lastAccess).to.exist
                        expect(task.lastAccess).to.be.an.instanceOf(Date)
                    })
                })
        )

        // TODO other test cases
    })
})