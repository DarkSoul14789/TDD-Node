const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  it('returns 200 Ok when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'P@ssword',
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('return success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'P@ssword',
      })
      .then((response) => {
        expect(response.body.message).toBe('User Registered Successfully');
        done();
      });
  });

  it('saves the user to database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'P@ssword',
      })
      .then(() => {
        User.findAll().then((users) => {
          expect(users.length).toBe(1);
          done();
        });
      });
  });

  it('saves the username and email to database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'P@ssword',
      })
      .then(() => {
        User.findAll().then((users) => {
          const savedUser = users[0];
          expect(savedUser.username).toBe('user1');
          expect(savedUser.email).toBe('user1@gmail.com')
          done();
        });
      });
  });
});
