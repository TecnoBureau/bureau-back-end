import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app.js';
import config from "../src/config/config.js";
import Registration from '../src/models/registration.model.js';

test.before(async () => {
  await mongoose.connect(`${config.mongodbUrl}${config.mongodbDatabase}?retryWrites=true&w=majority&ssl=true&authSource=admin`);
  console.log('MongoDB connected:', mongoose.connection.readyState === 1);
  assert.equal(mongoose.connection.readyState, 1, 'MongoDB não está conectado');
});

test('Limpar coleção Registration antes de iniciar os testes', async () => {
  const result = await Registration.deleteMany({});
  console.log('Registrations delete:', result.deletedCount);
});

test('POST /registrations deve criar um registro válido', async () => {
  const newReg = {
    fullName: "John Doe",
    cpf: "123.456.789-00",
    email: "john.doe@example.com",
    phone: "(11) 91234-5678",
    course: "Computer Science",
    ra: "123456",
    period: "Morning",
    availability: "Full-time",
    experience: "None",
    internshipInterest: "1",
    programParticipation: "0",
    previousParticipationDetails: "None",
    suggestions: "No suggestions"
  };
  const res = await request(app).post('/v1/api/registrations').send(newReg);
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.fullName, newReg.fullName);
});

test('POST /registrations deve falhar com CPF, email e telefone inválidos', async () => {
  const badReg = {
    fullName: "John Doe",
    cpf: "12345678900",
    email: "not-an-email",
    phone: "12345678",
    course: "Computer Science",
    ra: "123456",
    period: "Morning",
    availability: "Full-time",
    experience: "None",
    internshipInterest: "1",
    programParticipation: "0",
    previousParticipationDetails: "None"
  };
  const res = await request(app).post('/v1/api/registrations').send(badReg);
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.errors.cpf);
  assert.ok(res.body.errors.email);
  assert.ok(res.body.errors.phone);
});

test('POST /registrations deve retornar 500 em erro inesperado', async () => {
  const originalSave = Registration.prototype.save;
  Registration.prototype.save = () => { throw new Error('Unexpected DB error'); };
  const res = await request(app).post('/v1/api/registrations').send({
    fullName: "John Doe",
    cpf: "123.456.789-00",
    email: "john.doe@example.com",
    phone: "(11) 91234-5678",
    course: "CS",
    ra: "123456",
    period: "Morning",
    availability: "Full-time",
    experience: "None",
    internshipInterest: "1",
    programParticipation: "0",
    previousParticipationDetails: "None",
  });
  assert.equal(res.statusCode, 500);
  Registration.prototype.save = originalSave;
});

test('GET /registrations deve retornar 200 e um array', async () => {
  const res = await request(app).get('/v1/api/registrations');
  assert.equal(res.statusCode, 200);
  assert.ok(res.body.hasOwnProperty('registrations'));
  assert.ok(Array.isArray(res.body.registrations));
});

test('GET /registrations/csv deve retornar 200 e content-type text/csv', async () => {
  const res = await request(app).get('/v1/api/registrations/csv');
  assert.equal(res.statusCode, 200);
  assert.ok(res.headers['content-type'].includes('text/csv'));
});

test('GET /registrations deve retornar 500 se o banco falhar', async () => {
  const originalFind = Registration.find;
  Registration.find = () => { throw new Error('DB failure'); };
  const res = await request(app).get('/v1/api/registrations');
  assert.equal(res.statusCode, 500);
  Registration.find = originalFind;
});

test('GET /registrations/csv deve retornar 500 se o banco falhar', async () => {
  const originalFind = Registration.find;
  Registration.find = () => { throw new Error('DB failure'); };
  const res = await request(app).get('/v1/api/registrations/csv');
  assert.equal(res.statusCode, 500);
  Registration.find = originalFind;
});

test.after(async () => {
  await mongoose.connection.close();
});
