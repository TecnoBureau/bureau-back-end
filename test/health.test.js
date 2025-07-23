import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('GET /health retorna status ok e time', async () => {
  const res = await request(app).get('/v1/api/health');
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.status, 'ok');
  assert.ok(res.body.time);
});
