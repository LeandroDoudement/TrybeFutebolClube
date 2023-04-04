import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as dotenv from 'dotenv';
dotenv.config();
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
