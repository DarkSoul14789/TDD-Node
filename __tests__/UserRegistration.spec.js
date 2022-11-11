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
  const postValid = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'P@ssword',
    });
  };

  it('returns 200 Ok when signup request is valid', async () => {
    const response = await postValid();
    expect(response.status).toBe(200);
  });

  it('return success message when signup request is valid', async () => {
    const response = await postValid();
    expect(response.body.message).toBe('User Registered Successfully');
  });

  it('saves the user to database', async () => {
    await postValid();
    const users = await User.findAll();
    expect(users.length).toBe(1);
  });
  it('saves the username and email to database', async () => {
    await postValid();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@gmail.com');
  });

  it('hashes the pasword in the database', async () => {
    await postValid();
    const users = await User.findAll();
    const savedUser = users[0];
    expect(savedUser.password).not.toBe('P@ssword');
  });
});
