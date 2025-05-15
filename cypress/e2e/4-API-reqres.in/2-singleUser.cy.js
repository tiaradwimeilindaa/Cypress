/// <reference types="cypress" />

describe('GET Single User',() =>{
    it('should return single user with id 2',() =>{
    cy.request('GET', 'https://reqres.in/api/users/2')
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.have.property('id', 2);
      });
  });
}); 
