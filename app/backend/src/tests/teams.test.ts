import * as sinon from 'sinon';
import * as chai from 'chai';
import model from '../database/models/TeamModel';
import times from './mocks/times.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica-se o fluxo de Times', () => {
  describe('Testando a camada Service', () => {
    it('Deve retornar um array de times', async () => {
      const stub = sinon.stub(model, 'findAll').resolves(times);
      const result = await model.findAll();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      stub.restore();
    }
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
