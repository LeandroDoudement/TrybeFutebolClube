import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/Teams';
import { allTeams } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  beforeEach(function () {
    sinon.restore();
  });
  it('Retorna a lista de todos os times na rota GET /teams', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });
  it('Retorna a lista de um time de acordo com o id passado em /teams:id', async () => {
    sinon.stub(Teams, 'findByPk').resolves(allTeams[0]);
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams[0]);
  });
});
