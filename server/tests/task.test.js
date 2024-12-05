import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import { createTestUser, generateTestToken, clearDatabase } from './helpers.js';
import Task from '../models/Task.js';

const { expect } = chai;
chai.use(chaiHttp);

let testToken;

describe('Task API', () => {
  before(async () => {
    await clearDatabase();

    // Create a test user and generate a token
    const testUser = await createTestUser('Test User', 'testuser@example.com', 'password123');
    testToken = generateTestToken(testUser._id);

    // Add some initial tasks for testing
    await Task.create([
      { title: 'Sample Task 1', description: 'Description 1', user: testUser._id },
      { title: 'Sample Task 2', description: 'Description 2', user: testUser._id },
    ]);
  });

  after(async () => {
    await clearDatabase();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', (done) => {
      chai
        .request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ title: 'New Task', description: 'New task description' })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('task');
          expect(res.body.task).to.have.property('title', 'New Task');
          expect(res.body.task).to.have.property('description', 'New task description');
          done();
        });
    });

    it('should fail to create a task without required fields', (done) => {
      chai
        .request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ title: '' }) // Missing description
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('GET /api/tasks', () => {
    it('should fetch all tasks with pagination', (done) => {
      chai
        .request(app)
        .get('/api/tasks?page=1&limit=1')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('tasks').that.is.an('array').with.lengthOf(1);
          expect(res.body).to.have.property('totalPages');
          expect(res.body).to.have.property('currentPage', 1);
          done();
        });
    });

    it('should filter tasks by search query', (done) => {
      chai
        .request(app)
        .get('/api/tasks?search=Sample')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.tasks).to.be.an('array').with.length.greaterThan(0);
          expect(res.body.tasks[0].title).to.include('Sample');
          done();
        });
    });

    it('should sort tasks by title in ascending order', (done) => {
      chai
        .request(app)
        .get('/api/tasks?sort=title&order=asc')
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.tasks).to.be.an('array').that.is.not.empty;

          // Ensure sorted order by title
          const titles = res.body.tasks.map((task) => task.title);
          expect(titles).to.deep.equal([...titles].sort()); // Sorted check
          done();
        });
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const task = await Task.findOne({ title: 'Sample Task 1' });

      return chai
        .request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', `Bearer ${testToken}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Task deleted successfully');
        });
    });

    it('should fail to delete a non-existing task', (done) => {
      const invalidId = '64c927b3f1a23456789abcdef'; // Random valid ObjectId
      chai
        .request(app)
        .delete(`/api/tasks/${invalidId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error', 'Task not found');
          done();
        });
    });
  });
});
