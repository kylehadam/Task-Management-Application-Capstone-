import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import { createTestUser, generateTestToken, clearDatabase } from '../tests/helpers.js';

const { expect } = chai;
chai.use(chaiHttp);

let testToken;

describe('Task API', () => {
  before(async () => {
    await clearDatabase();

    // Create a test user
    const testUser = await createTestUser('Test User', 'testuser@example.com', 'password123');
    testToken = generateTestToken(testUser._id);
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', (done) => {
      chai
        .request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ title: 'Test Task', description: 'This is a test task' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('task');
          expect(res.body.task).to.have.property('title', 'Test Task');
          expect(res.body.task).to.have.property('description', 'This is a test task');
          done();
        });
    });
  });

  describe('GET /api/tasks', () => {
    it('should fetch all tasks', (done) => {
      chai
        .request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('tasks').that.is.an('array');
          expect(res.body.tasks).to.not.be.empty;
          done();
        });
    });
  });
});
