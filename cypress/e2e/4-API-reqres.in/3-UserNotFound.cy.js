describe('GET Single User Not Found', () => {
  it('should return 404 for user id 23', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/23',
      failOnStatusCode: false,
      headers: { 'x-api-key': 'reqres-free-v1' }
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body).to.be.empty;
    });
  });
});
