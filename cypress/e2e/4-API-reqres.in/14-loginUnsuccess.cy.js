/// <reference types="cypress" />

describe('POST Login Unsuccessful', () => {
  it('should fail login without password', () => {
    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        headers: {'x-api-key': 'reqres-free-v1'},
        failOnStatusCode: false,
        body: {
            email: 'peter@klaven',
        },
    }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body).to.have.property('error');
    });
  });
});
