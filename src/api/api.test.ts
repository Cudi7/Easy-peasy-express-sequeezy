import request from 'supertest';

import app from '../app';

describe('GET /api/v1', () => {
  it('Should respond with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
          '👋 Welcome to easy peasy express squezzy starter API! 🌎🌍🌏',
        );
        done();
      });
  });
});
