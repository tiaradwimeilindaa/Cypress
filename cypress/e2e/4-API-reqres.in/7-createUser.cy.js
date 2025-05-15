/// <reference types="cypress" />

describe('POST Create User', () => {
  it('should create a new user', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: { 'x-api-key': 'reqres-free-v1' },
      body: {
        name: 'morpheus',
        job: 'leader',
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.include.keys('id', 'name', 'job', 'createdAt');
    });
  });
});
