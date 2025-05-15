/// <reference types="cypress" />

describe('POST Register Unsuccessful', () => {
  it('should fail register without password', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers: {'x-api-key': 'reqres-free-v1'},
      failOnStatusCode: false,
      body: {
        email: 'sydney@fife',
      },
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('error');
    });
  });
});
