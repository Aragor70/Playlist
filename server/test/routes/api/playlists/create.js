const expect = require('chai').expect;
const request = require('supertest');
const server = require('../../../../server');




describe('Test POST /api/playlists/', () => {
    
    
    this.playlists = [{title: "X", id: 1}, {title: "Equal", id: 2}, {title: "Tenerife", id: 3}, ];

    

    it ('For Fail, Return err msg when req title contains wrong characters.', (done) => {


        request(server.playlists).post('/api/playlists')
            .send({ title: '#error//' })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Your input does not match the requirements.")
                
                done()
                
            }).catch((err) => done(err));
        
    });
    
    it ('For Fail, Return err msg when req body is empty.', (done) => {


        request(server.playlists).post('/api/playlists')
            .send({ })
            .then((response) => {
                
                expect(response.statusCode).to.equal(422)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('message')

                expect(body.success).to.equal(false)
                expect(body.message).to.equal("Your input is empty. Please enter the required value.")
                
                done()
                
            }).catch((err) => done(err));
        
    });


    it ('For Success, Create a new playlist.', (done) => {


        request(server.playlists).post('/api/playlists')
            .send({ title: "Equal" })
            .then((response) => {
                               
                expect(response.statusCode).to.equal(201)
                
                const body = response.body

                expect(body).to.contain.property('success')
                expect(body).to.contain.property('playlist')
                expect(body).to.contain.property('message')

                expect(body.message).to.equal("Playlist Created")
                expect(body.playlist.title).to.equal("Equal")
                
                done()
                
            }).catch((err) => done(err));
        
    });

})