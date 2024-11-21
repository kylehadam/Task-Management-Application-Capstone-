import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import { clearDatabase, createTestUser } from './helpers.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth API', () => {
  before(async () => {
    await clearDatabase();
  });

  after(async () => {
    await clearDatabase();
  });

  it('should register a user successfully', async () => {
    const res = await chai.request(app).post('/api/auth/register').send({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('token');
  });

  it('should log in a user successfully', async () => {
    await chai.request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: 'loginuser@example.com',
      password: 'password123',
    });

    const res = await chai.request(app).post('/api/auth/login').send({
      email: 'loginuser@example.com',
      password: 'password123',
    });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
  });

  it('should fail to log in with invalid credentials', async () => {
    const res = await chai.request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'wrongpassword',
    });

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error', 'Invalid credentials');
  });
});
