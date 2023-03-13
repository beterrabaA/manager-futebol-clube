import * as sinon from 'sinon';
import * as chai from 'chai';
import Match from '../database/models/MatchModel';
import matches from './mocks/matches.mock';
import chaiHttp = require('chai-http');
import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica-se o fluxo de Partidas', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matches as unknown as Match[]);
  });

  it('Verifica a resposta de /matches', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  });
})