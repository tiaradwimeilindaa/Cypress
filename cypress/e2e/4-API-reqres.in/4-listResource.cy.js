/// <reference types="cypress" />

describe('GET List Resource', () => {
  it('should return resource list', () => {
    cy.request('GET', 'https://reqres.in/api/unknown')
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('array').and.not.be.empty;
      });
  });
});
