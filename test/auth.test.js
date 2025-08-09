let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server'); 
let should = chai.should();

chai.use(chaiHttp);

describe('Auth Routes', () => {
  it('should register a user', done => {
    chai.request(server)
      .post('/register')
      .send({ email: 'test@example.com', password: '123456' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        done();
      });
  });

  it('should login a user', done => {
    chai.request(server)
      .post('/login')
      .send({ email: 'test@example.com', password: '123456' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
