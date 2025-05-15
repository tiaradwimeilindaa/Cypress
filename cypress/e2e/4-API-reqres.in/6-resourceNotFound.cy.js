/// <reference types="cypress" />

describe('GET Single Resource Not Found', () => {
  it('should return 404', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown/23',
      failOnStatusCode: false,
      headers: { 'x-api-key': 'reqres-free-v1' }
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.be.empty;
    });
  });
});
