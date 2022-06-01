const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server');


describe('Test DELETE /api/playlists/:id', () => {
    
    it ('For Fail, Return 404 when playlist was not found.', (done) => {

        request(server.playlists).delete('/api/playlists/' + 0)
        .send({ })
        .then((response) => {
            
            expect(response.statusCode).to.equal(404)
            
            const body = response.body

            expect(body).to.contain.property('success')
            expect(body).to.contain.property('message')

            
            expect(body.success).to.equal(false)

            done()
            
        }).catch((err) => done(err));
    });

})