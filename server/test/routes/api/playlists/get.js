const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server')


describe('Test GET /api/playlists', () => {
    
    before((done) => {
        const titles = [ "X", "Equal", "Plus" ]

        for (let i = 0; i < titles.length; i++) {
            request(server.playlists).post('/api/playlists/')
                .send({ title: titles[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    


    it ('For Success, Get a correct response with a status and properties, and array of playlists', (done) => {

        request(server.playlists).get('/api/playlists/')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('playlists');
                expect(body.playlists).to.be.an('array');
                expect(body.success).to.be.a('boolean');
                
                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get a filtred array of playlists by title.', (done) => {

        request(server.playlists).get('/api/playlists?phrase=Equal')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('playlists');
                
                expect(body.playlists).to.be.an('array').to.have.lengthOf.above(0);

                if (body.playlists.length) {
                    expect(body.playlists[0]).to.own.include({title: 'Equal'});
                }

                done();
            
            }).catch((err) => done(err));
    });

    
    it ('For Failure, Get an playlist by id.', (done) => {

        request(server.playlists).get('/api/playlists/0')
            .then((response) => {
            
                expect(response.statusCode).to.equal(404)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                

                expect(body.success).to.equal(false);

                done();
            
            }).catch((err) => done(err));
    });
    
    it ('For Success, Get an playlist by id.', (done) => {

        request(server.playlists).get('/api/playlists/1')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('playlist');
                

                if (body.playlist) {
                    expect(body.playlist.id).to.equal(1);
                }

                done();
            
            }).catch((err) => done(err));
    });
    



});