/// <reference types="cypress" />

describe('PATCH Update User', () => {
  it('should register successfully', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://reqres.in/api/user/2',
      headers: { 'x-api-key': 'reqres-free-v1' },
      body: {
        name: 'morpheus',
        job: 'zion resident',
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include.keys('name', 'job', 'updatedAt');

    });
  });
});
