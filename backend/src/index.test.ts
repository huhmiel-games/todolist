import request from 'supertest';

import { app } from './index';

describe('GET /', () =>
{
    it('GET / => array of todos', () =>
    {
        return request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>
            {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            title: expect.any(String),
                            description: expect.any(String),
                            done: expect.any(Number),
                        }),
                    ])
                );
            });
    });

    it('GET / => todo by ID', () =>
    {
        return request(app)
            .get('/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) =>
            {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String),
                        description: expect.any(String),
                        done: expect.any(Number),
                    })
                );
            });
    });

    it('GET /id => 404 if todo not found', () =>
    {
        return request(app).get('/10000000000').expect(404);
    });

    it('POST / => create NEW todo', () =>
    {
        return (
            request(app)
                .post('/')
                .send({
                    title: 'testing todo',
                })
                .expect('Content-Type', /json/)
                .expect(201)
        );
    });

    it('POST / => todo correct data type check', () =>
    {
        return request(app).post('/').send({ name: 123456789 }).expect(400);
    });
});