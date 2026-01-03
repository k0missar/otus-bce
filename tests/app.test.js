const request = require('supertest')
const app = require('../app')

jest.mock('../models/course', () => ({
    find: jest.fn().mockResolvedValue([
        { title: 'Тестовый курс' }
    ])
}));

describe('App', () => {

    test('GET / должен отдавать главную страницу', async () => {
        const res = await request(app).get('/')

        expect(res.statusCode).toBe(200)
        expect(res.text).toContain('Параметр')
    })

    test('GET /course должен отдавать страницу курса', async () => {
        const res = await request(app).get('/course')

        expect(res.statusCode).toBe(200)
        expect(res.text).toContain('Название курса')
    })

    test('GET /auth должен отдавать страницу авторизации', async () => {
        const res = await request(app).get('/auth')

        expect(res.statusCode).toBe(200)
    })

})