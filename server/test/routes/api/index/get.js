const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server')


describe('Test GET /', () => {
    

    it ('For Success, Get available Playlist homepage, get the head title name.', (done) => {

        request(server.authors).get('/')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200);
                
                const body = response.body;
                
                expect(body).to.not.contain.property('success');
                
                expect(response.text).to.match(/Playlist/);
                
                done();
            
            }).catch((err) => done(err));
    });


});