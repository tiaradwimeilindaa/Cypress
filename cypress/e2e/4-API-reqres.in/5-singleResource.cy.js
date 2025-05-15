/// <reference types="cypress" />

describe('GET Single Resource', () => {
  it('should return single resource with id 2', () => {
    cy.request('GET', 'https://reqres.in/api/unknown/2')
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.have.property('id',2);
      });
  });
});
