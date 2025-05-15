/// <reference types ="cypress"/>

describe('GET List Users',() =>{
    it('GET API Testing',() =>{
        cy.request('GET', 'https://reqres.in/api/users?page=2')
        .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.not.be.null
        })
    })
})