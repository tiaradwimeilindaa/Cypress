/// <reference types="cypress" />

describe('DELETE User', () => {
  it('should delete user with id 2', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/user/2',
      headers: { 'x-api-key': 'reqres-free-v1' },
    }).then((res) => {
        expect(res.status).to.eq(204);
        expect(res.body).to.be.empty;
      });
  });
});
