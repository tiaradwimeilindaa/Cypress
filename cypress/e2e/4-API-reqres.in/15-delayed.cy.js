/// <reference types="cypress" />

describe('GET Delayed Response', () => {
    it('should return users with delay=3 seconds', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=3',
            headers: {'x-api-key': 'reqres-free-v1'},
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.data).to.be.an('array').and.not.be.empty;
        });
    });
});
