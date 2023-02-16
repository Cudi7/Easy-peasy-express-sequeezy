import request from 'supertest';
import app from '../../app';

import { Unicorns } from './unicorns.model';

beforeAll(async () => {
  try {
    await Unicorns.drop();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
    }
  }
});

describe('GET /api/v1/unicorns', () => {
  it('Should respond with an array of Empty Unicorns', async () =>
    request(app)
      .get('/api/v1/unicorns')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';
describe('POST /api/v1/unicorns', () => {
  it('Should respond with an error if the Unicorn is invalid', async () =>
    request(app)
      .post('/api/v1/unicorns')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        expect(response.body).toHaveProperty('message');
      }));
  it('Should respond with an Inserted object', async () =>
    request(app)
      .post('/api/v1/unicorns')
      .set('Accept', 'application/json')
      .send({
        name: 'Rufus',
        age: 231,
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');

        id = response.body._id;

        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('Rufus');
        expect(response.body).toHaveProperty('age');
      }));
});

describe('GET /api/v1/unicorns/:id', () => {
  it('Should respond with a single Unicorn', async () =>
    request(app)
      .get(`/api/v1/unicorns/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe('Rufus');
        expect(response.body).toHaveProperty('age');
      }));

  it('Should respon with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/unicorns/gfdgdfsgds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
  it('Should respond with a Not Found Error', (done) => {
    request(app)
      .get('/api/v1/unicorns/63ede88850a56334b46db12e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe('PUT /api/v1/unicorns/:id', () => {
  it('Should respon with an invalid ObjectId Error', (done) => {
    request(app)
      .put('/api/v1/unicorns/gfdgdfsgds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
  it('Should respond with a Not Found Error', (done) => {
    request(app)
      .put('/api/v1/unicorns/63ede88850a56334b46db12e')
      .set('Accept', 'application/json')
      .send({
        name: 'Rufus',
        age: 3215,
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  it('Should respond with a single Unicorn', async () =>
    request(app)
      .put(`/api/v1/unicorns/${id}`)
      .set('Accept', 'application/json')
      .send({
        name: 'Rufus',
        age: 3215,
      })
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('age');
        expect(response.body.age).toBe(3215);
      }));
});

describe('DELETE /api/v1/unicorns/:id', () => {
  it('Should respond with an invalid ObjectId Error', (done) => {
    request(app)
      .delete('/api/v1/unicorns/gfdgdfsgds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
  it('Should respond with a Not Found Error', (done) => {
    request(app)
      .delete('/api/v1/unicorns/63ede88850a56334b46db12e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
  it('Should respond with a 204 Status Code', (done) => {
    request(app)
      .delete(`/api/v1/unicorns/${id}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(204);
        done();
      });
  });
  it('Should respond with 404 Not Found', async () =>
    request(app)
      .get(`/api/v1/unicorns/${id}`)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(404);
      }));
});
