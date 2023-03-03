import * as sinon from 'sinon';
import * as chai from 'chai';
import Team from '../database/models/TeamModel';
import times from './mocks/times.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica-se o fluxo de Times', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(times as unknown as Team[]);
  });

  
  it('Verifica a resposta de /teams', async () => {
    
    chaiHttpResponse = await chai.request(app).get('/teams');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });

  it('Verifica a resposta de um time específico', async () => {

    sinon
    .stub(Team, "findByPk")
    .resolves(times[2] as unknown as Team);

    chaiHttpResponse = await chai.request(app).get('/teams/2')

    expect(chaiHttpResponse.status).to.be.equal(200);

  })
});
