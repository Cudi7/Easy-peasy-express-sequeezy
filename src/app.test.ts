import request from 'supertest';

import app from './app';

describe('app', () => {
  it('Should respond with a Not Found Message', (done) => {
    request(app)
      .get('/easy-peasy-express-squeezy')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});

describe('GET /', () => {
  it('Should respond with a Json Message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
          "👋🌎🌍🌏 Welcome! I'm excited to provide you with the tools and resources you need to create amazing applications. 🚀 Let's create something great! ✨🎉🎊👨‍💻👩‍💻",
        );
        done();
      });
  });
});
