const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server')


describe('Test GET /api/songs', () => {
    
    before((done) => {
        const titles = [ "Tenerife Sea", "Sea", "Tenerife" ]

        for (let i = 0; i < titles.length; i++) {
            request(server.songs).post('/api/songs/')
                .send({ title: titles[i] })
                .catch((err) => done(err));
        }
        done();
        
    })
    


    it ('For Success, Get a correct response with a status and properties, and array of songs', (done) => {

        request(server.songs).get('/api/songs/')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('songs');
                expect(body.songs).to.be.an('array');
                expect(body.success).to.be.a('boolean');
                
                done();
            
            }).catch((err) => done(err));
    });

    it ('For Success, Get a filtred array of songs by title.', (done) => {

        request(server.songs).get('/api/songs?phrase=sea')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('songs');
                
                expect(body.songs).to.be.an('array').to.have.lengthOf.above(0);

                if (body.songs.length) {
                    expect(body.songs[0]).to.own.include({title: 'Sea'});
                }

                done();
            
            }).catch((err) => done(err));
    });

    
    it ('For Failure, Get an song by id.', (done) => {

        request(server.songs).get('/api/songs/0')
            .then((response) => {
            
                expect(response.statusCode).to.equal(404)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                

                expect(body.success).to.equal(false);

                done();
            
            }).catch((err) => done(err));
    });
    
    it ('For Success, Get an song by id.', (done) => {

        request(server.songs).get('/api/songs/1')
            .then((response) => {
            
                expect(response.statusCode).to.equal(200)
                
                const body = response.body
                
                expect(body).to.contain.property('success');
                expect(body).to.contain.property('song');
                

                if (body.song) {
                    expect(body.song.id).to.equal(1);
                }

                done();
            
            }).catch((err) => done(err));
    });
    




});