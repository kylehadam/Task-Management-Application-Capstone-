import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import { clearDatabase, createTestUser, generateTestToken } from './helpers.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Analytics API', () => {
  let testUser;
  let token;

  before(async () => {
    await clearDatabase();
    testUser = await createTestUser('Analytics User', 'analyticsuser@example.com', 'password123');
    token = generateTestToken(testUser._id);
  });

  after(async () => {
    await clearDatabase();
  });

  it('should fetch task completion statistics', async () => {
    const res = await chai
      .request(app)
      .get('/api/analytics/stats')
      .set('Authorization', `Bearer ${token}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('completedTasks');
    expect(res.body).to.have.property('pendingTasks');
  });
});
