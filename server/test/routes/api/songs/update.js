const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server')


describe('Test PUT /api/songs/:id', () => {
    
    this.songs = [{title: "title1"}, {title: "title2"}, {title: "title3"}, ];


    before((done) => {

        for (let i = 0; i < this.songs.length; i++) {
            request(server.songs).post('/api/songs/')
                .send({ title: this.songs[i].title })
                .catch((err) => done(err));
        }
        done();
        
    })
    
    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {

        request(server.songs).put('/api/songs/2')
            .send({ title: '#error//' })
            .then((response) => {
                
                expect(response.statusCode).to.be.within(404, 422);

                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                if(response.statusCode === 422) {
                    expect(body.message).to.equal("Your input does not match the requirements.")
                } else {
                    expect(body.message).to.equal("song does not exist.")
                }
                expect(body.success).to.equal(false)
                
                
                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return 404 when params is not defined.', (done) => {

        request(server.songs).put('/api/songs/')
            .send({ title: 'name1' })
            .then((response) => {
                
                expect(response.statusCode).to.equal(404)

                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Failure, Return an error if req body is empty', (done) => {

        request(server.songs).put('/api/songs/' + 2)
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(201);

                const body = response.body;

                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Update last name.', (done) => {


        request(server.songs).put('/api/songs/' + 1)
            .send({ title: 'Ed' })
            .then((response) => {

                expect(response.statusCode).to.equal(201);
                
                const body = response.body;

                expect(body).to.contain.property('success');
                expect(body).to.contain.property('message');

                expect(body).to.contain.property('song')
                expect(body.message).to.equal("Song updated")
                expect(body.song.title).to.equal("Ed")
                
                done()
                
            }).catch((err) => done(err));
        
    });

})