describe('Goal Routes', () => {
  let token = '';

  before(done => {
    chai.request(server)
      .post('/login')
      .send({ email: 'test@example.com', password: '123456' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  it('should set a new goal', done => {
    chai.request(server)
      .post('/goals')
      .set('Authorization', `Bearer ${token}`)
      .send({ goalType: 'steps', targetValue: 10000 })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('goalType');
        done();
      });
  });
});
