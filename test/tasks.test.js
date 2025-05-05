const request = require('supertest');
const app = require('../src/app');

describe('Task Manager API', () => {
  let createdTaskId;

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .expect(200);
    
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'New Task' })
      .expect(201);
    
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('New Task');
    createdTaskId = res.body.id;
  });

  it('should get a task by ID', async () => {
    const res = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .expect(200);
    
    expect(res.body.id).toBe(createdTaskId);
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ completed: true })
      .expect(200);
    
    expect(res.body.completed).toBe(true);
  });

  it('should delete a task', async () => {
    await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .expect(200);
    
    await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .expect(404);
  });
});