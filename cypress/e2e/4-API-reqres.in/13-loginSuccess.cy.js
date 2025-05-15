/// <reference types="cypress" />

describe('POST Login Successful', () => {
  it('should login successfully', () => {
    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        headers: {'x-api-key': 'reqres-free-v1'},
        body:{
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
    });
  });
});
