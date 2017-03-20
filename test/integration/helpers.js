import supertest from 'supertest';
import chai from 'chai';
import app from '../../app.js';
import Client from '../../dal/client';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.Client = Client;