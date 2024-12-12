import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import { createTestUser, clearDatabase, generateTestToken } from './helpers.js';

const { expect } = chai;
chai.use(chaiHttp);

let token;

describe('Analytics API', () => {
  before(async () => {
    await clearDatabase();

    // Create a test user and generate a token
    const testUser = await createTestUser('Test User', 'testuser@example.com', 'password123');
    token = generateTestToken(testUser._id);
  });

  it('should fetch task completion statistics', async () => {
    // Create sample tasks for the user
    await chai
      .request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task 1', description: 'First task', completed: true });

    await chai
      .request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task 2', description: 'Second task', completed: false });

    // Call the analytics endpoint
    const res = await chai
      .request(app)
      .get('/api/analytics/stats')
      .set('Authorization', `Bearer ${token}`);

    // Validate response structure and values
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success', true); // Ensure API call is successful
    expect(res.body).to.have.nested.property('data.completedTasks', 1); // Assert completed tasks count
    expect(res.body).to.have.nested.property('data.pendingTasks', 1); // Assert pending tasks count
  });
});
