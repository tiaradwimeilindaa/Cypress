/// <reference types="cypress" />

describe('POST Register - Successful', () => {
  it('should register successfully and return a token', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers: {'x-api-key': 'reqres-free-v1'},
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });
});
