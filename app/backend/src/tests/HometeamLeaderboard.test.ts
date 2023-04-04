import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import {
  userOneResponse,
  userOneRequest,
  userOnePayload,
} from './mocks/Login.mock';
import { Response } from 'superagent';
import Users from '../database/models/Users';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;
import homeTeamLeaderboardMock from './mocks/HometeamLeaderboard.mock';
chai.use(chaiHttp);

const { expect } = chai;
describe('Testes da rota /leaderboard', async () => {
  beforeEach(function () {
    sinon.restore();
  });

  it('Retorna o leaderboard dos homeTeams na rota /leaderboard/home', async () => {
    const httpResponse = await chai.request(app).get('/leaderboard/home');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body.length).to.be.equal(
      homeTeamLeaderboardMock.length
    );
  });
});
