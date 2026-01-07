const request = require('supertest')
const app = require('../app')

jest.mock('../models/course', () => ({
    find: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue([
            {
                title: 'Тестовый курс',
                description: 'Описание курса',
                difficulty: 'easy',
                tags: ['js', 'node'],
                author_id: {
                    username: 'testuser'
                }
            }
        ])
    })),
    findOne: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue({
            title: 'Тестовый курс',
            description: 'Описание курса',
            difficulty: 'easy',
            tags: ['js', 'node'],
            author_id: {
                username: 'testuser'
            }
        })
    }))
}))

describe('Pages', () => {

    test('GET / должен отдавать главную страницу', async () => {
        const res = await request(app).get('/')

        expect(res.statusCode).toBe(200)
        expect(res.text).toContain('Тестовый курс')
    })

    test('GET /courses должен отдавать страницу со списком курсов', async () => {
        const res = await request(app).get('/courses')

        expect(res.statusCode).toBe(200)
        expect(res.text).toContain('Тестовый курс')
    })

    test('GET /auth должен отдавать страницу авторизации', async () => {
        const res = await request(app).get('/auth')

        expect(res.statusCode).toBe(200)
    })

})
