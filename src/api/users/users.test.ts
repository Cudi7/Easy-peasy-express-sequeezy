import request from 'supertest';
import app from '../../app';

import { Users } from './users.model';

beforeAll(async () => {
  try {
    await Users.drop();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
    }
  }
});

describe('GET /api/v1/users', () => {
  it('Should respond with an array of Empty Users', async () =>
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';
describe('POST /api/v1/users', () => {
  it('Should respond with an error if the User is invalid', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message');
      }));
  it('Should respond with an inserted object', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Cudi',
        email: 'test@test.com',
        password: '123456789',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        id = response.body._id;

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('Cudi');
        expect(response.body).toHaveProperty('email');
      }));
});

describe('GET /api/v1/users/:id', () => {
  it('Should respond with a single User', async () =>
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('Cudi');
        expect(response.body).toHaveProperty('email');
      }));

  it('Should respond with an invalid objectId error', (done) => {
    request(app)
      .get('/api/v1/users/gfdgdfsgds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
  it('Should respond with a not found error', (done) => {
    request(app)
      .get('/api/v1/users/63ede88850a56334b46db12e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe('PUT /api/v1/users/:id', () => {
  it('Should respond with an invalid objectId Error', (done) => {
    request(app)
      .put('/api/v1/users/gfdgdfsgds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
  it('Should respond with a Not Found Error', (done) => {
    request(app)
      .put('/api/v1/users/63ede88850a56334b46db12e')
      .set('Accept', 'application/json')
      .send({
        name: 'Cudi',
        email: 'test@test.com',
        password: '123456789',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  it('Shoul respond with a Single User', async () =>
    request(app)
      .put(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .send({
        name: 'Cudi',
        email: 'cudi@gmail.com',
        password: 'Jv87fd(/)GY',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body.email).toBe('cudi@gmail.com');
        expect(response.body).toHaveProperty('password');
      }));
});

describe('DELETE /api/v1/users/:id', () => {
  it('Should respond with an invalid ObjectId Error', (done) => {
    request(app)
      .delete('/api/v1/users/gfdgdfsgds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
  it('Should respond with a Not Found Error', (done) => {
    request(app)
      .delete('/api/v1/users/63ede88850a56334b46db12e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  it('Should responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(204);
        done();
      });
  });
  it('Should respond with 404 Not Found', async () =>
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      }));
});
